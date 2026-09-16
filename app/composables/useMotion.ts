let cache: Promise<GsapBundle> | null = null

export type GsapBundle = {
  gsap: typeof import('gsap').gsap
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
  SplitText: typeof import('gsap/SplitText').SplitText
  Flip: typeof import('gsap/Flip').Flip
}

/**
 * Loads GSAP and its plugins on demand, once. Keeping it out of the entry bundle
 * leaves the network free for the hero image, which is the largest paint.
 */
export function loadGsap(): Promise<GsapBundle> {
  if (!cache) {
    cache = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
      import('gsap/Flip'),
    ]).then(([core, scrollTrigger, splitText, flip]) => {
      core.gsap.registerPlugin(scrollTrigger.ScrollTrigger, splitText.SplitText, flip.Flip)
      return { gsap: core.gsap, ScrollTrigger: scrollTrigger.ScrollTrigger, SplitText: splitText.SplitText, Flip: flip.Flip }
    })
  }
  return cache
}

/** True when the visitor asked for reduced motion. */
export function prefersReducedMotion() {
  return import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** True when the visitor has a precise pointer (mouse or trackpad). */
export function hasFinePointer() {
  return import.meta.client && window.matchMedia('(pointer: fine)').matches
}

export function canAnimate() {
  return import.meta.client && !prefersReducedMotion()
}
