<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { canAnimate, hasFinePointer } from '~/composables/useMotion'
import { useScene } from '~/composables/useScene'
import type { GateScene } from './gates'

const canvas = ref<HTMLCanvasElement | null>(null)
const { setScene, setFallback, staticFallback } = useScene()
let instance: GateScene | null = null
let onResize: (() => void) | null = null
let onPointer: ((event: PointerEvent) => void) | null = null
let fpsCheck: number | undefined

/**
 * Waits for a real sign of engagement before pulling in Three.js: the first scroll,
 * pointer move or touch. A visitor who never scrolls never pays for the 3D.
 */
function whenEngaged(): Promise<void> {
  return new Promise((resolve) => {
    let done = false
    const events: [string, EventListener][] = []
    const finish = () => {
      if (done) return
      done = true
      events.forEach(([name, handler]) => window.removeEventListener(name, handler))
      resolve()
    }
    const onScroll = () => { if (window.scrollY > window.innerHeight * 0.12) finish() }
    const onInput = () => finish()
    events.push(['scroll', onScroll], ['pointermove', onInput], ['touchstart', onInput], ['wheel', onInput], ['keydown', onInput])
    events.forEach(([name, handler]) => window.addEventListener(name, handler, { passive: true }))
  })
}

onMounted(async () => {
  if (!canAnimate() || !canvas.value) { setFallback(true); return }
  // Low-core devices get the still image instead: the 3D is not worth the main thread.
  if ((navigator.hardwareConcurrency ?? 8) <= 2) { setFallback(true); return }
  await whenEngaged()
  if (!canvas.value) return
  const { createGateScene } = await import('./gates')
  const mobile = window.innerWidth < 768
  instance = createGateScene(canvas.value, { mobile })
  if (!instance) { setFallback(true); return }
  setScene(instance)

  onResize = () => instance?.resize()
  window.addEventListener('resize', onResize)
  if (hasFinePointer()) {
    onPointer = (event) => instance?.setPointer(event.clientX / window.innerWidth - 0.5, event.clientY / window.innerHeight - 0.5)
    window.addEventListener('pointermove', onPointer)
  }
  // Give up on the 3D if the device cannot keep a reasonable frame rate.
  fpsCheck = window.setTimeout(() => {
    if (instance && instance.fps() < 40) {
      instance.dispose(); instance = null; setScene(null); setFallback(true)
    }
  }, 4000)
})

onBeforeUnmount(() => {
  if (onResize) window.removeEventListener('resize', onResize)
  if (onPointer) window.removeEventListener('pointermove', onPointer)
  window.clearTimeout(fpsCheck)
  instance?.dispose()
  setScene(null)
})
</script>

<template>
  <div class="scene" aria-hidden="true">
    <canvas v-show="!staticFallback" ref="canvas" class="scene__canvas" />
    <img v-if="staticFallback" class="scene__still" src="/brand/phase-gates-still.webp" alt="" width="1600" height="1000">
  </div>
</template>

<style scoped>
.scene { position: fixed; inset: 0; z-index: var(--z-canvas); pointer-events: none; }
.scene__canvas { width: 100%; height: 100%; display: block; opacity: 0; }
.scene__still { position: absolute; right: -8%; top: 50%; transform: translateY(-50%); width: 76%; opacity: 0.5; }
@media (max-width: 767px) { .scene__still { right: -20%; width: 130%; opacity: 0.35; } }
</style>
