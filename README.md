# Amazon Enhancements 📦

A little Chrome extension that tidies up the bits of Amazon that bug me. Right now that's one thing, but it's built to collect more. No options page, no button, no settings. It just quietly makes Amazon nicer.

## Enhancements ✨

- **Hide sponsored.** Sponsored search results, sponsored carousels, sponsored brand banners and videos, and the sponsored rows on product pages all vanish before they're drawn. The real results stay exactly where they were. 🙈

## What hide sponsored does 🧹

Amazon tucks ads in everywhere: the top few "results", whole carousels, a video halfway down, a "Brands related to your search" strip at the bottom. This finds them and hides them:

- **Markers first, words second.** Amazon tags its ads the same way on every storefront and in every language: an `AdHolder` slot, a `puis-sponsored-label-text` label, a sponsored widget heading, an ad feedback link. Those are what it looks for, so it doesn't care whether the page says Sponsored, Gesponsert, スポンサー or إعلان.
- **Words as a backup.** A label whose whole text is "Sponsored" in one of the storefronts' languages counts too, in case Amazon draws one without its usual tags. It has to be the whole label, so a product with the word in its name is safe.
- **Just the ad.** A sponsored card inside a carousel of deals hides that card, and the organic deals next to it stay. A carousel whose heading says Sponsored goes as a whole.
- **No flash.** It starts before the page does, adds one stylesheet, and marks ads as they stream in, so they're hidden before the first paint. Results that load later get the same treatment. ⚡

It covers every Amazon storefront: `.com`, `.ca`, `.com.mx`, `.com.br`, `.co.uk`, `.ie`, `.de`, `.fr`, `.it`, `.es`, `.nl`, `.com.be`, `.se`, `.pl`, `.com.tr`, `.ae`, `.sa`, `.eg`, `.in`, `.co.jp`, `.com.au`, `.sg`, `.cn` and `.co.za`. 🌍

## Install it 🔧

You need [Node.js](https://nodejs.org) 22 or newer, and Chrome 126 or newer.

1. Grab the code and build it:

   ```bash
   git clone https://github.com/christianjbrown/chrome-extension-amazon-enhancements.git
   cd chrome-extension-amazon-enhancements
   npm ci
   npm run build
   ```

   That makes a `dist` folder, which is the actual extension.

2. Open `chrome://extensions` in Chrome.
3. Flip on **Developer mode** (top right).
4. Click **Load unpacked** and pick the `dist` folder.
5. Reload any Amazon tab you already had open.

### Updating 🔄

```bash
git pull
npm ci
npm run build
```

Then hit the reload arrow on the Christian's Amazon Enhancements card in `chrome://extensions`, and reload Amazon.

## Good to know 🤓

- **It asks for no permissions.** It only runs on the Amazon storefronts, so Chrome will say it can read and change your data there, and that's the whole list.
- **Nothing is deleted.** Ads are hidden with a stylesheet, not ripped out of the page, so Amazon's own scripts keep working and nothing breaks.

## No tracking 🔒

No analytics, no tracking, no ads (ha), no accounts, and nothing phoning home. It never talks to the internet at all, so nothing about your shopping leaves your machine. It looks at the page, hides the sponsored bits, and that's it.

## Hacking on it 🛠️

It's TypeScript, bundled with esbuild, tested with Vitest.

```bash
npm test          # the unit tests
npm run ci        # everything CI checks: format, lint, types, unused code, 100% coverage, build
```

`npm run ci` has to pass before a push leaves your machine (the pre-push hook runs it), and coverage has to stay at 100% for lines, branches, functions and statements, or it fails.

How it fits together, all in `src`:

- **`main.ts`** builds every enhancement and starts it. It's the only file that touches `document` or `MutationObserver`.
- **`enhancement.ts`** is the one-method interface every enhancement implements.
- **`hide-sponsored/`** is the first enhancement:
  - **`hide-sponsored.ts`** adds the stylesheet, scans what's on the page, then watches for more.
  - **`page-style.ts`** puts the stylesheet on the page.
  - **`node-watcher.ts`** reports elements Amazon adds, and labels whose text arrives late.
  - **`scanner.ts`** hides every block a rule finds.
  - **`sponsored-rule.ts`** is the rule interface, plus one that runs a list of rules.
  - **`label-rule.ts`** climbs from an ad marker to the result or widget around it.
  - **`text-label-rule.ts`** does the same for a label that just says "Sponsored".
  - **`hider.ts`** marks a block so the stylesheet hides it.
  - **`sponsored-markers.ts`** is the list of markers, words and the stylesheet itself.

Every class gets its collaborators through its constructor, behind an interface, so each one is tested on its own with fakes. Adding the next enhancement means a new class and one more line in the list in `main.ts`. 🧩
