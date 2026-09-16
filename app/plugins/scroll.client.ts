/**
 * The page is built from sticky, scroll-driven sections, so the browser's own
 * scroll restoration can land a reload in the wrong place. Start at the top and
 * keep the scroll position across GSAP refreshes (resize, orientation change).
 */
export default defineNuxtPlugin(() => {
  if (history.scrollRestoration) history.scrollRestoration = 'manual'

  window.addEventListener('load', () => window.scrollTo(0, 0), { once: true })

  let ratio = 0
  const save = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    ratio = scrollable > 0 ? window.scrollY / scrollable : 0
  }
  const restore = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    if (ratio > 0 && scrollable > 0) window.scrollTo({ top: ratio * scrollable, behavior: 'auto' })
  }

  // Registered lazily: GSAP itself only loads once the visitor engages with the page.
  const attach = async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.addEventListener('refreshInit', save)
    ScrollTrigger.addEventListener('refresh', restore)
  }
  window.addEventListener('resize', () => { void attach() }, { once: true })
})
