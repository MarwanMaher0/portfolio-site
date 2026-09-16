import { onMounted, onBeforeUnmount } from 'vue'
import { loadGsap, canAnimate } from './useMotion'

type RevealOptions = { selector?: string; y?: number; stagger?: number; start?: string }

/**
 * Reveals elements on scroll. Content is visible by default, so the page is
 * complete without JavaScript and under reduced motion.
 */
export function useReveal(root: () => HTMLElement | null | undefined, options: RevealOptions = {}) {
  const { selector = '[data-reveal]', y = 24, stagger = 0.07, start = 'top 82%' } = options
  let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null

  onMounted(async () => {
    if (!canAnimate()) return
    const el = root()
    if (!el) return
    const { gsap } = await loadGsap()
    ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector)
      if (!items.length) return
      gsap.from(items, {
        y, opacity: 0, duration: 0.9, ease: 'power3.out', stagger,
        scrollTrigger: { trigger: el, start },
      })
    }, el)
  })

  onBeforeUnmount(() => ctx?.revert())
}

/** Splits a heading into lines and raises them through a mask. */
export function useHeadingReveal(root: () => HTMLElement | null | undefined, selector = '[data-split]') {
  let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null
  onMounted(async () => {
    if (!canAnimate()) return
    const el = root()
    if (!el) return
    const { gsap, SplitText } = await loadGsap()
    ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((heading) => {
        const split = new SplitText(heading, { type: 'lines', linesClass: 'split-line' })
        split.lines.forEach((line) => {
          const wrap = document.createElement('span')
          wrap.style.display = 'block'
          wrap.style.overflow = 'hidden'
          line.parentNode?.insertBefore(wrap, line)
          wrap.appendChild(line)
        })
        gsap.from(split.lines, {
          yPercent: 110, duration: 0.9, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      })
    }, el)
  })
  onBeforeUnmount(() => ctx?.revert())
}

/** Counts a number up when it enters view. */
export async function useCountUp(el: HTMLElement, value: number, suffix = '') {
  if (!canAnimate()) { el.textContent = `${value}${suffix}`; return }
  const { gsap } = await loadGsap()
  const state = { n: 0 }
  gsap.to(state, {
    n: value, duration: 1.2, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 90%' },
    onUpdate: () => { el.textContent = `${Math.round(state.n)}${suffix}` },
  })
}
