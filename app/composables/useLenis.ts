import { loadGsap, canAnimate } from './useMotion'
import type Lenis from 'lenis'

let lenis: Lenis | null = null

/** One smooth-scroll instance for the whole site, synced with ScrollTrigger. */
export function useLenis() {
  const start = async () => {
    if (!import.meta.client || lenis || !canAnimate()) return null
    const [{ default: LenisClass }, { gsap, ScrollTrigger }] = await Promise.all([import('lenis'), loadGsap()])
    lenis = new LenisClass({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis?.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return lenis
  }
  const scrollTo = (target: string | HTMLElement) => {
    if (lenis) lenis.scrollTo(target as never, { offset: -80 })
    else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ block: 'start' })
    else target.scrollIntoView({ block: 'start' })
  }
  const stop = () => { lenis?.destroy(); lenis = null }
  return { start, stop, scrollTo, instance: () => lenis }
}
