# Four modern GSAP skins

Date: 2026-08-11 · Status: approved

## Goal

Take the Skins library from six skins to ten by adding four modern, Webflow/Framer-grade
landing page skins. Each new skin owns a **different layout engine**, not a different palette.
Motion is GSAP, bundled locally.

## The four

| Skin | id | prefix | Layout engine | Fonts | Job |
|---|---|---|---|---|---|
| Aurora | `aurora` | `.aur-` | Animated mesh hero into an asymmetric bento grid | Instrument Sans, Instrument Serif | AI and modern SaaS. The default Framer template look |
| Studio | `studio` | `.stu-` | Pinned horizontal scroll track, kinetic display type | Bricolage Grotesque, DM Sans | Agency, portfolio, creative studio |
| Canvas | `canvas` | `.cnv-` | Sticky split scrollytelling, pinned visual morphs per step | Sora | Product story told in order |
| Prism | `prism` | `.prz-` | Stacking scroll cards that pin, scale and slide over each other | Space Grotesk, Figtree | Launch page. Loud, gradient, high energy |

## GSAP integration

- `gsap` becomes a runtime dependency. Imported inside each new skin's **bundled** module
  script (`<script>`, not `<script is:inline>`), so Astro emits it as a local chunk. No CDN,
  so the no-external-assets rule holds. Only the four new routes pay the cost.
- The existing six skins are untouched. They keep the layout's IntersectionObserver
  `data-reveal` primitive.
- **No ScrollSmoother and no Lenis.** Smooth scroll defeats the QA scroll priming.

### The `data-anim` safety contract

GSAP driven elements carry `data-anim`. It mirrors `data-reveal` exactly:

- Visible by default, so a page with JS off is fully readable.
- Hidden only under `html.js`, released by GSAP.
- Forced visible under `prefers-reduced-motion: reduce`, where the GSAP init returns early
  after setting every `[data-anim]` to its resting state.
- `scripts/qa.mjs` gains an assert: no `[data-anim]` may still compute to `opacity: 0`
  after the scroll walk. Same guarantee the library already has for `data-reveal`.

### Init pattern, every new skin

```js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-anim]').forEach(el => el.classList.add('is-armed'));
if (reduced) { /* reveal everything, bind nothing */ }
document.fonts?.ready.then(() => ScrollTrigger.refresh());
```

`document.fonts.ready` matters: pinned triggers measured before a webfont swaps end up with
wrong end positions.

## Files touched

Added:
- `src/skins/{aurora,studio,canvas,prism}/Page.astro`
- `src/pages/s/{aurora,studio,canvas,prism}.astro`

Modified:
- `src/lib/skins.ts` four registry entries
- `src/styles/base.css` the `data-anim` primitive
- `src/pages/index.astro` six to ten in copy, routing rule paragraph, four display fonts added
  to the shared Google Fonts href, grid holds ten cards
- `src/layouts/Skin.astro` og:image:alt count
- `scripts/qa.mjs` SKIN_IDS, live preview count, `data-anim` assert
- `scripts/shots.mjs` SKIN_IDS
- `public/sitemap.xml` four routes
- `README.md`, `package.json` to 1.2.0

`src/lib/content.ts` is **not** touched. Every new skin renders the existing object.

## Contract each new skin still obeys

Reads from `content`. Unique class prefix on every selector. One `<style is:global>`.
No external images, visuals are CSS or inline SVG. Carries anchor ids `features`, `showcase`,
`proof`, `pricing`, `cta`. Exactly one `h1`. Respects `html.embed` set by `?embed=1`, which
also suppresses the custom cursor in Studio. No em dashes. Never
`<template set:text={longString}>`, it hangs the Astro compiler with no error.

## Known risks

1. **Horizontal overflow.** QA fails above `innerWidth + 1` at 1440 and 375. The Studio
   horizontal track lives inside an `overflow: hidden` section and moves on `xPercent`.
   Prism card stack uses transforms only, never layout width.
2. **Pinned triggers inside the gallery iframe.** Every skin is embedded at quarter scale.
   Pins must not throw there. Verified by the existing embed QA route.
3. **QA scroll priming jumps** in 55ms steps with `scroll-behavior: auto`. ScrollTrigger
   handles instant jumps, but anything using `scrub` must never scrub opacity down to zero on
   content, or a return to the top leaves it invisible. Scrub is reserved for transforms.
4. **Mobile.** Pinning is disabled below 860px in Studio and Canvas via
   `ScrollTrigger.matchMedia`, which falls back to a normal stacked scroll.

## Done when

`npm run build` clean, and QA passes on all eleven routes at 1440 and 375 with zero failures.
