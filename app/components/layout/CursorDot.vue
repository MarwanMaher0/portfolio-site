<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { canAnimate, hasFinePointer, loadGsap } from '~/composables/useMotion'

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const label = ref('')
const active = ref(false)
const visible = ref(false)
let cleanup: (() => void) | null = null

onMounted(async () => {
  if (!canAnimate() || !hasFinePointer() || !dot.value || !ring.value) return
  document.documentElement.classList.add('has-custom-cursor')
  const { gsap } = await loadGsap()
  const dotX = gsap.quickTo(dot.value, 'x', { duration: 0.05 })
  const dotY = gsap.quickTo(dot.value, 'y', { duration: 0.05 })
  const ringX = gsap.quickTo(ring.value, 'x', { duration: 0.35, ease: 'power3.out' })
  const ringY = gsap.quickTo(ring.value, 'y', { duration: 0.35, ease: 'power3.out' })

  const move = (event: PointerEvent) => {
    visible.value = true
    dotX(event.clientX); dotY(event.clientY)
    ringX(event.clientX); ringY(event.clientY)
    const target = (event.target as HTMLElement)?.closest?.('[data-cursor], a, button') as HTMLElement | null
    label.value = target?.dataset?.cursor ?? ''
    active.value = Boolean(target)
  }
  const leave = () => { visible.value = false }
  window.addEventListener('pointermove', move)
  document.addEventListener('pointerleave', leave)
  cleanup = () => {
    window.removeEventListener('pointermove', move)
    document.removeEventListener('pointerleave', leave)
    document.documentElement.classList.remove('has-custom-cursor')
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div class="cursor" :class="{ 'cursor--visible': visible }" aria-hidden="true">
    <span ref="dot" class="cursor__dot" :class="{ 'is-hidden': active }" />
    <span ref="ring" class="cursor__ring" :class="{ 'is-active': active, 'is-label': !!label }">
      <span v-if="label" class="cursor__label">{{ label }}</span>
    </span>
  </div>
</template>

<style scoped>
.cursor { position: fixed; inset: 0; z-index: var(--z-cursor); pointer-events: none; opacity: 0; transition: opacity var(--dur-fast); }
.cursor--visible { opacity: 1; }
.cursor__dot, .cursor__ring { position: fixed; top: 0; left: 0; border-radius: var(--radius-pill); }
.cursor__dot { width: 8px; height: 8px; background: var(--ink); margin: -4px 0 0 -4px; transition: opacity var(--dur-fast); }
.cursor__dot.is-hidden { opacity: 0; }
.cursor__ring {
  width: 36px; height: 36px; margin: -18px 0 0 -18px; border: 1px solid var(--ink-2);
  display: grid; place-items: center;
  transition: width var(--dur-base), height var(--dur-base), margin var(--dur-base), background var(--dur-base), border-radius var(--dur-base), border-color var(--dur-base);
}
.cursor__ring.is-active { width: 56px; height: 56px; margin: -28px 0 0 -28px; border-color: var(--ink-3); }
.cursor__ring.is-label { width: 76px; height: 48px; margin: -24px 0 0 -38px; border-radius: var(--radius-card); background: var(--ink); border-color: var(--ink); }
.cursor__label { font-family: var(--font-mono); font-size: 11px; letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--bg); }
</style>
