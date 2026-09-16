<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { canAnimate, hasFinePointer, loadGsap } from '~/composables/useMotion'

const props = defineProps<{ images: { src: string; alt: string; kind?: string }[] }>()
const root = ref<HTMLElement | null>(null)
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null

const desktop = () => props.images.filter((i) => i.kind !== 'mobile').slice(0, 3)
const phone = () => props.images.find((i) => i.kind === 'mobile')

onMounted(async () => {
  if (!canAnimate() || !root.value) return
  const { gsap } = await loadGsap()
  ctx = gsap.context(() => {
    // Cards start visible and only travel into the fan: an empty frame reads as broken.
    gsap.from('[data-card]', {
      xPercent: (i) => -10 * (2 - i), yPercent: (i) => 6 * (2 - i), rotateY: (i) => -10 * (2 - i), opacity: 0.5,
      ease: 'none', stagger: 0.05,
      scrollTrigger: { trigger: root.value, start: 'top 95%', end: 'center 65%', scrub: 0.5 },
    })
  }, root.value)

  if (!hasFinePointer()) return
  const cards = Array.from(root.value.querySelectorAll<HTMLElement>('[data-card]'))
  const setters = cards.map((card, index) => ({
    rotateY: gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3.out' }),
    rotateX: gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3.out' }),
    x: gsap.quickTo(card, 'x', { duration: 0.6, ease: 'power3.out' }),
    depth: index,
  }))
  const move = (event: PointerEvent) => {
    const rect = root.value!.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setters.forEach((set) => {
      const factor = 1 + set.depth * 0.6
      set.rotateY(px * 8 * factor - (2 - set.depth) * 8)
      set.rotateX(-py * 6)
      set.x(px * 24 * factor)
    })
  }
  const leave = () => setters.forEach((set) => { set.rotateY(-(2 - set.depth) * 8); set.rotateX(0); set.x(0) })
  root.value.addEventListener('pointermove', move)
  root.value.addEventListener('pointerleave', leave)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="stack">
    <div
      v-for="(img, index) in desktop()" :key="img.src" class="stack__card" data-card
      :style="{ zIndex: index + 1, '--depth': index }"
    >
      <AppImage :src="img.src" :alt="img.alt" sizes="(max-width: 1023px) 92vw, 52vw" />
    </div>
    <div v-if="phone()" class="stack__phone">
      <AppImage :src="phone()!.src" :alt="phone()!.alt" sizes="180px" />
    </div>
  </div>
</template>

<style scoped>
.stack { position: relative; perspective: 1400px; width: 100%; aspect-ratio: 16 / 11; max-height: 100%; }
.stack__card {
  position: absolute; inset: 0; margin: auto; width: 92%; height: fit-content;
  border-radius: var(--radius-card); overflow: hidden; border: 1px solid var(--line);
  box-shadow: var(--shadow-float); transform-style: preserve-3d;
  transform: translateZ(calc((var(--depth) - 2) * 80px)) translateX(calc((var(--depth) - 2) * 6%)) rotateY(calc((2 - var(--depth)) * -8deg));
}
.stack__phone { position: absolute; right: 2%; bottom: -6%; width: clamp(96px, 13%, 150px); z-index: 5; border-radius: 18px; overflow: hidden; border: 1px solid var(--line); box-shadow: var(--shadow-float); }
@media (max-width: 1023px) { .stack { aspect-ratio: 16 / 12; } .stack__card { width: 88%; } }
</style>
