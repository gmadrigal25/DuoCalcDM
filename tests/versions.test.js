// The US, UK and European/Brazilian versions, and the lit keys during a force.
// Run with: node tests/versions.test.js
const { chromium } = require('playwright');
const path = require('path');
const assert = require('assert');

const url = (folder) => 'file://' + path.resolve(__dirname, '..', folder, 'index.html');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 466, height: 678 }, hasTouch: true });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const key = (k) => page.click(`[data-key="${k}"]`);
  const type = async (s) => { for (const c of s) await key(c); };
  const info = () => page.evaluate(() => ({
    text: window.__calc.state().text,
    lang: document.documentElement.lang,
    dot: document.querySelector('[data-key="."]').textContent,
    target: window.__calc.state().force.target,
  }));

  const cases = [
    ['', 'en-US', '.', '1,234,567.89'],
    ['us', 'en-US', '.', '1,234,567.89'],
    ['uk', 'en-GB', '.', '1,234,567.89'],
    ['eu', 'en', ',', '1.234.567,89'],
  ];
  for (const [folder, lang, dot, shown] of cases) {
    await page.goto(url(folder));
    await page.evaluate(() => localStorage.clear());
    await page.goto(url(folder));
    await type('1234567.89');
    const i = await info();
    assert.deepStrictEqual([i.lang, i.dot, i.text], [lang, dot, shown], (folder || 'root') + ' version formatting');
  }

  // The European version performs the force and shows its separators.
  await page.goto(url('eu'));
  await type('2026');
  await page.click('#clockBtn');
  await type('347'); await key('+'); await type('589'); await key('=');
  assert.strictEqual((await info()).text, '936');
  await key('+'); await key('+');
  for (let n = 0; n < 4; n++) {
    await page.touchscreen.tap(200, 300 + n * 40);
    await page.waitForTimeout(90);
  }
  await key('=');
  assert.strictEqual((await info()).text, '2.026', 'EU force lands, shown as 2.026');

  // Versions don't share a force number when opened in the same browser.
  await page.goto(url('eu')); await type('55'); await page.click('#clockBtn');
  await page.goto(url('uk'));
  assert.strictEqual((await info()).target, null, 'UK version has its own force number');

  // Lit keys, as in CalcDM: the forced digit's key lights while the finger is down and goes
  // out when it lifts; the key actually touched doesn't light.
  await page.goto(url(''));
  await page.evaluate(() => window.__calc.setTarget(500));
  await type('9000'); await key('-'); await key('-'); // needs 8500
  const cdp = await page.context().newCDPSession(page);
  const sevenBox = await page.locator('[data-key="7"]').boundingBox();
  const pt = [{ x: sevenBox.x + sevenBox.width / 2, y: sevenBox.y + sevenBox.height / 2 }];
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt });
  await page.waitForTimeout(250);
  const down = await page.evaluate(() => ({
    eightLit: document.querySelector('[data-key="8"]').classList.contains('flash'),
    sevenPressed: document.querySelector('[data-key="7"]').classList.contains('pressed'),
  }));
  assert.deepStrictEqual(down, { eightLit: true, sevenPressed: false }, 'forced 8 lit while held; touched 7 not');
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(50);
  assert.strictEqual(await page.evaluate(() => document.querySelector('[data-key="8"]').classList.contains('flash')),
    false, 'goes out when the finger lifts');
  assert.strictEqual((await info()).text, '9,000−8', 'the touch typed the forced 8, not 7');

  assert.deepStrictEqual(errors, [], 'no page errors');
  await browser.close();
  console.log('versions test passed');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
