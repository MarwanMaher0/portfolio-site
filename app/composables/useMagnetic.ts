import { onMounted, onBeforeUnmount } from 'vue'
import { loadGsap, canAnimate, hasFinePointer } from './useMotion'

/** Pulls elements gently toward the pointer; the inner label trails for depth. */
export function useMagnetic(selector = '[data-magnetic]', radius = 80, strength = 12) {
  let cleanup: (() => void) | null = null

  onMounted(async () => {
    if (!canAnimate() || !hasFinePointer()) return
    const { gsap } = await loadGsap()
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector))
    const handlers = nodes.map((node) => {
      const label = node.querySelector<HTMLElement>('[data-magnetic-label]')
      const toX = gsap.quickTo(node, 'x', { duration: 0.5, ease: 'power3.out' })
      const toY = gsap.quickTo(node, 'y', { duration: 0.5, ease: 'power3.out' })
      const labelX = label ? gsap.quickTo(label, 'x', { duration: 0.5, ease: 'power3.out' }) : null
      const labelY = label ? gsap.quickTo(label, 'y', { duration: 0.5, ease: 'power3.out' }) : null
      const move = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        const distance = Math.hypot(dx, dy)
        const pull = Math.max(0, 1 - distance / (radius + rect.width / 2))
        const x = (dx / (rect.width / 2 || 1)) * strength * pull
        const y = (dy / (rect.height / 2 || 1)) * strength * pull
        toX(x); toY(y); labelX?.(x * 0.6); labelY?.(y * 0.6)
      }
      const leave = () => { toX(0); toY(0); labelX?.(0); labelY?.(0) }
      window.addEventListener('pointermove', move)
      node.addEventListener('pointerleave', leave)
      return () => { window.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', leave) }
    })
    cleanup = () => handlers.forEach((off) => off())
  })

  onBeforeUnmount(() => cleanup?.())
}
