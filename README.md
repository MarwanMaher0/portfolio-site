# Marwan Maher — portfolio

A one-page portfolio built from `BRIEF.md` in the final pack: the story runs **Decide → Ship → Learn**,
with three 3D "phase gates" the visitor flies through, plus ten case-study pages.

Nuxt 4 · TypeScript · GSAP (ScrollTrigger, SplitText, Flip) · Lenis · Three.js · statically generated.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run generate     # static site in .output/public
npm run test         # Vitest: the decision-toy maths
npm run test:e2e     # Playwright: content, the toy, the Arabic lab, accessibility
node gzip-server.mjs # serve the built site locally with gzip, on :4175
```

## Deploy to Vercel

Import the repository, framework preset **Nuxt**, build command `npm run generate`, output directory
`.output/public`. No environment variables. The CV also stays at `/Marwan_Maher_Technical_PM_AI.pdf`,
where older links point.

## Where things live

| Path | What |
|---|---|
| `content/*.json` | Every word and image reference. The components never invent content. |
| `public/` | Photo, 41 work screenshots, 6 open-source screenshots, 3 CVs, brand assets. |
| `app/components/sections/` | One component per section of the story. |
| `app/components/scene/` | The Three.js gate scene and its scroll-driven states. |
| `app/composables/` | Motion loading, smooth scroll, reveals, magnetic elements, scene state. |
| `app/utils/decision.ts` | The decision-toy maths, unit-tested. |
| `tests/` | Vitest and Playwright. |

## Decisions worth knowing

- **The 3D loads only after the visitor scrolls, moves the pointer or taps.** Three.js is 560 KB, and
  loading it at startup cost about a second of blocking time on a mid-range phone. A visitor who never
  scrolls never pays for it. Devices reporting two cores or fewer, and anyone with reduced motion or no
  WebGL, get the still image instead.
- **GSAP and Lenis load on demand** for the same reason; the entry bundle is about 195 KB.
- **The hero intro is CSS, not GSAP.** Since the motion library loads late, a JavaScript-driven intro
  made the hero flash. The photo itself is never animated.
- **The Arabic lab is real.** Off, the value is a plain text node and the browser reorders it; on, it is
  wrapped in `<bdi>`. The Playwright test measures the on-screen character order to prove both states.
- **Content rules** come from the pack's `BRIEF.md` §11: internal products are described at the level of
  role and outcome, only the listed images are used, and the photo is never altered.

## Checks at the time of writing

| Check | Result |
|---|---|
| Vitest | 5 passed |
| Playwright (desktop + mobile) | 10 passed |
| Lighthouse desktop | 97 performance · 100 accessibility · 100 best practices · 100 SEO |
| Lighthouse mobile | 73 performance · 100 accessibility · 100 best practices · 100 SEO |
| axe (WCAG 2.1 A/AA) | no serious or critical issues |

Mobile performance is measured against a local server with simulated slow 4G; a CDN with HTTP/2 and
brotli will do better. The remaining cost is the page's size: it is one long page with every section
server-rendered.
