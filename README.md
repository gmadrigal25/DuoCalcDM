# DuoCalcDM

A working replica of the iPhone Calculator, built as a web app you add to your Home Screen,
with a forcing mechanism built in. It's [CalcDM](https://github.com/dmaso/calcdm) by Dave Mason,
adapted for the **iPhone Duo**. It's made for
[The Alright Force](https://www.thejerx.com/blog/2026/9/15/the-alright-force) from The Jerx, and
lets you do the whole routine face up while the spectator drums their fingers on the screen.

Folded or unfolded, it matches the Duo's own Calculator. It re-fits instantly when you fold,
unfold or rotate the phone, and keeps a force in progress, so you can open the phone in the
middle of the routine. It also works on ordinary iPhones.

## Credits

- **[Dave Mason](https://github.com/dmaso)** created [CalcDM](https://github.com/dmaso/calcdm)
  ([calcdm.com](https://calcdm.com)), the app and forcing method this is based on. All credit
  for the idea and how it works goes to him.
- **Demian Max** collaborated with Dave on CalcDM's later improvements: the one-tap setup, the
  digit-count indicator, the lit-up keys and the idea of showing whether to add or subtract.
  Dave developed the indicators so they stay visible throughout, and added the option to hide
  them.
- **[The Jerx](https://www.thejerx.com)** published
  [The Alright Force](https://www.thejerx.com/blog/2026/9/15/the-alright-force), the routine this
  is built for. Earlier background:
  [the calculator force, face up](https://www.thejerx.com/blog/2025/5/6/t12u882u8mz4kzsjc0hfh1efgbqdpx)
  and [Carefree Toxic](https://www.thejerx.com/blog/2025/5/13/carefree-toxic).
- [The Daily Magician: the I.C.F. force](https://thedailymagician.com/icf-force) is the force
  CalcDM was originally made for.
- [andyjermann/fakecalc](https://github.com/andyjermann/fakecalc) is the static-screenshot
  version CalcDM started from.

The name DuoCalcDM is in honour of Dave Mason's CalcDM. This version was adapted by gmadrigal25, who changed only what the iPhone Duo needed. The
code was rewritten from scratch for the Duo's two screens, while keeping CalcDM's behaviour and
controls exactly as Dave Mason designed them.

### What's different from CalcDM

- Layouts for the Duo's cover screen and inner screen, upright and sideways, using the Duo
  Calculator's 5 × 4 keypad, measured from screenshots of the real app.
- It re-fits when you fold or unfold, without losing the number, the sum or a force in
  progress.
- It doesn't black out when held sideways, because the unfolded Duo is used in landscape.
- The clock hand swings between positions rather than jumping, and holding the clock and
  calculator buttons is protected against iOS long-press gestures.
- `?screen=` and `?lift=` URL options, for adjusting the layout on the phone.
- Includes the later CalcDM improvements by Dave Mason and Demian Max: one-tap setup, peek on
  the decimal key, reset on delete, the indicator specks, lit-up keys and wrong-operator
  protection.

## Install on the phone

1. Host the folder over **HTTPS**. The easiest option is GitHub Pages: repo **Settings → Pages →
   Deploy from a branch**, pick the branch and `/ (root)`. Any static host works too.
2. Open the URL (for GitHub Pages, `https://gmadrigal25.github.io/DuoCalcDM/`) in **Safari** on
   the Duo, then **Share → Add to Home Screen**, and name it **Calculator**. The Home Screen
   name stays "Calculator" so it passes as the real app.
3. Launch it once from the Home Screen while online so it caches. After that it works offline.
   If you added an earlier version, delete it and add it again. iOS only reads some settings
   (the icon and the status bar style) when you add the app.
4. Turn **Rotation Lock** on. The real Calculator switches to scientific mode when it's turned
   sideways, but this one doesn't.

## Performing

This follows the latest CalcDM, with the improvements by Dave Mason and Demian Max.

1. **Set the force number.** Type it and **tap the clock** (top left) once. The display clears
   and the minute hand swings to **9 o'clock**. The number is remembered even if you close the
   app.
2. **The spectator does real maths.** Every step is genuine and can be checked on another
   calculator.
3. **Watch the two specks.** After the first calculation or operator press, two tiny white
   specks appear, each on a key just below its symbol and a little to the right, like dust:
   - one on **+** or **−**, showing which way gets to the force number;
   - one on a **digit key** (1 to 9), showing how many digits the final number needs.

   For example, with a force number of 123,456: a total of 26,331 puts them under **+** and
   **5** (26,331 + 97,125), and a total of 829,771 puts them under **−** and **6**
   (829,771 − 706,315). They update when = or an operator is pressed, not while digits are
   typed, so you can keep calculating until the length suits you. They don't show right after
   you set the number, when the total already equals it, or when more than 9 digits would be
   needed. For a decimal, only the digits count: 12.34 shows under **4** but takes five taps.
   *Optional:* hold any operator to see the exact number that would be needed after it.
4. **Arm it.** Tap the operator the speck shows **twice**. The specks disappear. Only that
   operator arms: if − is needed, + + does nothing, and vice versa, and × and ÷ never arm. This
   works the same with the specks hidden (hold an operator to check: the number shown is
   negative on the wrong one).
5. **The spectator drums their fingers.** Every separate tap, anywhere, types the next
   character of the needed number, and that digit's key lights up as it appears. No key keeps
   its usual job, not even delete. Two or three fingers landing together count as one tap. When
   every digit is in, the hand moves to **6 o'clock** and further taps do nothing. You can fold
   or unfold the phone in the middle of this.
6. **Press =**. The force number appears, with a sum in grey above it that really adds up. The
   force number then clears itself and the hand returns to 3 o'clock.

### Secret controls

All of these work only before the force is armed, so they can't interfere with the drumming.

| Do this | What happens |
| --- | --- |
| Tap the clock | Save the number on screen as the force number (hand to 9 o'clock) |
| Hold **.** | Peek at the force number while held (holding the calculator icon does the same) |
| Hold **⌫** | Complete reset: force number cleared, hand back to 3 o'clock |
| Hold **%** | Turn the specks off or on (remembered). A normal tap on % still works. |
| Hold an operator | Show the number needed after that operator |

| Clock hand | Meaning |
| --- | --- |
| 3 o'clock | No force number stored |
| 9 o'clock | Force number stored |
| 6 o'clock | Final number complete, ready for = |

The clock and calculator buttons look and work the same on every screen, folded or unfolded,
so the method is identical either way. Once all the digits are in, only **=** does anything.

### URL options (for example from an iOS Shortcut)

| URL | Effect |
| --- | --- |
| `…/?t=1234` | Preset the force number. It's kept until it's used or cleared. |
| `…/?lift=-6` | Nudge the whole layout up (negative) or down in points if it sits wrong on your phone. `?lift=0` resets it. |
| `…/?screen=cover` | Force the cover / `inner` / `iphone` layout if the automatic choice is wrong. `?screen=auto` resets it. |
| `…/?blackout=1` | Go black whenever the screen is wider than tall (`0` turns this off). It's off by default because the unfolded Duo is landscape. |

## How it fits the Duo

The layouts are measured from screenshots of the real Calculator on the iPhone Duo. To within
a pixel, they match the key sizes, gaps, margins, number size and button positions in all four
cases:

- **Folded, upright:** 5 × 4 round keys.
- **Folded, sideways:** 5 × 4 capsule keys, with the keypad stopping short of the right edge.
- **Unfolded, upright:** 5 × 4 tall capsules.
- **Unfolded, sideways:** 5 × 4 wide capsules.

**iOS rotation bug.** On the unfolded Duo, after you turn a Home Screen web app upright and
back, iOS cuts the page off 82pt short. The app detects this and nudges iOS into redoing the
frame, which shows as a brief flicker. Nothing in the calculation is touched. If that ever
fails, it reloads once, keeping the display, the sum and any force in progress.

The app picks the layout from the screen size every time it changes, so folding, unfolding and
rotating re-fit it immediately without losing anything that's typed. Ordinary tall iPhones get
the iPhone's 4 × 5 layout. If the keypad sits a little high or low on the real phone, use
`?lift=`. If the wrong layout is chosen, use `?screen=`.

## Development

Static files with no build step. Open `index.html`, or run `npm run serve`.

- `engine.js` contains the maths and formatting (iOS precedence, 9-digit display, and solving for
  the operand that hits the force number). It's pure, so it's unit-tested in Node.
- `app.js` contains the layout, input handling and force logic. `window.__calc` exposes test
  hooks.
- `style.css` contains the look. All the geometry comes from CSS variables set by `layout()`.
- `sw.js` and `manifest.webmanifest` handle offline use and Home Screen install.
- `icon.png` is drawn from scratch by `tools/make_icon.py` in the style of the iOS system icon. You can replace
  it with any 512×512 PNG.
- `npm test` runs the unit tests, a Chromium run-through of a full performance at Duo-like
  sizes (including unfolding mid-force), and a simulation of the iOS rotation bug. Screenshots go to `tests/shots/`.
