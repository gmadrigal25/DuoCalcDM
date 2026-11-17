// The iOS rotation bug on the unfolded iPhone Duo: after turning upright and back, iOS reports
// the page 82pt short until the app nudges its viewport setting. Simulate that, and check that a
// force started on the folded screen survives unfolding (no reload, nothing lost) and still lands.
// Run with: node tests/rotation.test.js
const { chromium } = require('playwright');
const path = require('path');
const assert = require('assert');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 466, height: 678 }, hasTouch: true });
  let loads = 0;
  page.on('load', () => loads++);
  await page.addInitScript(() => {
    Object.defineProperty(window, 'innerHeight', {
      get: () => document.documentElement.clientHeight - (window.__short ? 82 : 0),
    });
    new MutationObserver(() => {
      if (window.__short) { window.__short = false; window.__nudged = true; }
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ['content'] });
  });
  await page.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  const key = (k) => page.click(`[data-key="${k}"]`);
  const tap = async (x, y) => { await page.touchscreen.tap(x, y); await page.waitForTimeout(90); };
  const st = () => page.evaluate(() => {
    const s = window.__calc.state();
    return { text: s.text, armed: s.force.armed, fed: s.force.fed, digits: s.force.digits };
  });

  for (const c of '2026') await key(c);
  const cb = await page.locator('#clockBtn').boundingBox();
  await page.mouse.move(cb.x + 24, cb.y + 24);
  await page.mouse.down();
  await page.waitForTimeout(900);
  await page.mouse.up();
  for (const k of ['3', '4', '7', '*', '2', '=', '+', '+']) await key(k);
  await tap(100, 400);
  await tap(300, 500);
  const before = await st();
  assert.deepStrictEqual(before, { text: '694+13', armed: true, fed: 2, digits: '1332' });

  await page.evaluate(() => { window.__short = true; });
  await page.setViewportSize({ width: 867, height: 669 });
  await page.waitForTimeout(1200);
  assert.strictEqual(await page.evaluate(() => window.__nudged), true, 'viewport nudge ran');
  assert.strictEqual(loads, 1, 'no reload needed');
  assert.deepStrictEqual(await st(), before, 'force untouched by unfolding');

  for (const [x, y] of [[400, 300], [700, 500], [200, 600], [500, 200]]) await tap(x, y);
  await key('=');
  assert.strictEqual((await st()).text, '2,026', 'force lands after unfolding');

  await browser.close();
  console.log('rotation test passed');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
