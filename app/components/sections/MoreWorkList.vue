<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import projects from '~~/content/projects.json'
import { canAnimate, hasFinePointer, loadGsap } from '~/composables/useMotion'
import { image } from '~/utils/images'

const root = ref<HTMLElement | null>(null)
const preview = ref<HTMLElement | null>(null)
const activeIndex = ref<number | null>(null)
const items = projects.more
let cleanup: (() => void) | null = null

const previewFor = (i: number) => image(items[i]?.images?.[0]?.src ?? '')

onMounted(async () => {
  if (!canAnimate() || !hasFinePointer() || !root.value || !preview.value) return
  const { gsap } = await loadGsap()
  const toX = gsap.quickTo(preview.value, 'x', { duration: 0.5, ease: 'power3.out' })
  const toY = gsap.quickTo(preview.value, 'y', { duration: 0.5, ease: 'power3.out' })
  const toRotate = gsap.quickTo(preview.value, 'rotate', { duration: 0.6, ease: 'power3.out' })
  let lastX = 0
  const move = (event: PointerEvent) => {
    toX(event.clientX + 24); toY(event.clientY - 110)
    const velocity = event.clientX - lastX
    lastX = event.clientX
    toRotate(gsap.utils.clamp(-6, 6, velocity * 0.4))
  }
  window.addEventListener('pointermove', move)
  cleanup = () => window.removeEventListener('pointermove', move)
})
onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div ref="root" class="more container" @pointerleave="activeIndex = null">
    <ul class="more__list">
      <li v-for="(project, i) in items" :key="project.slug">
        <NuxtLink
          class="more__row" :class="{ 'is-dim': activeIndex !== null && activeIndex !== i }"
          :to="`/work/${project.slug}`" data-cursor="View"
          @pointerenter="activeIndex = i" @focus="activeIndex = i" @blur="activeIndex = null"
        >
          <span class="more__title">{{ project.title }}</span>
          <span class="more__subtitle">{{ project.subtitle }}</span>
          <span class="mono more__dates">{{ project.dates }}</span>
          <span class="more__arrow" aria-hidden="true">→</span>
          <span class="more__thumb hide-lg">
            <AppImage v-if="project.images?.length" :src="project.images[0].src" :alt="''" sizes="120px" />
          </span>
        </NuxtLink>
      </li>
    </ul>

    <div ref="preview" class="more__preview hide-sm" :class="{ 'is-visible': activeIndex !== null }" aria-hidden="true">
      <img
        v-if="activeIndex !== null && previewFor(activeIndex).src"
        :src="previewFor(activeIndex).src" :srcset="previewFor(activeIndex).srcset" sizes="360px"
        :width="previewFor(activeIndex).width" :height="previewFor(activeIndex).height" alt=""
      >
    </div>
  </div>
</template>

<style scoped>
.more { position: relative; }
.more__row { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr) auto auto; gap: 24px; align-items: center; padding: clamp(18px, 2.4vw, 30px) 0; border-top: 1px solid var(--line); transition: opacity var(--dur-base), transform var(--dur-base); }
.more__list li:last-child .more__row { border-bottom: 1px solid var(--line); }
.more__row:hover, .more__row:focus-visible { transform: translateX(12px); }
.more__row.is-dim { opacity: 0.45; }
.more__title { font-family: var(--font-display); font-size: var(--text-h3); }
.more__subtitle { color: var(--ink-2); }
.more__arrow { color: var(--accent); }
.more__thumb { width: 110px; border-radius: 10px; overflow: hidden; border: 1px solid var(--line); }
.more__preview { position: fixed; top: 0; left: 0; width: 360px; aspect-ratio: 16 / 10; border-radius: var(--radius-card); overflow: hidden; border: 1px solid var(--line); box-shadow: var(--shadow-float); opacity: 0; transition: opacity var(--dur-base); pointer-events: none; z-index: 40; }
.more__preview.is-visible { opacity: 1; }
.more__preview img { width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 1023px) {
  .more__row { grid-template-columns: 1fr auto; grid-template-areas: 'title thumb' 'subtitle thumb' 'dates arrow'; gap: 8px 16px; }
  .more__title { grid-area: title; } .more__subtitle { grid-area: subtitle; } .more__dates { grid-area: dates; }
  .more__arrow { grid-area: arrow; } .more__thumb { grid-area: thumb; }
  .more__row:hover { transform: none; }
}
</style>
