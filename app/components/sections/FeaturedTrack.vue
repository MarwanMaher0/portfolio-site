<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import projects from '~~/content/projects.json'
import { canAnimate, loadGsap } from '~/composables/useMotion'
import { useCountUp } from '~/composables/useReveal'

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const index = ref(1)
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null
const items = projects.featured

onMounted(async () => {
  root.value?.querySelectorAll<HTMLElement>('[data-metric-value]').forEach((el) => {
    const raw = el.dataset.metricValue ?? ''
    const numeric = Number(raw.replace(/[^\d.]/g, ''))
    if (!Number.isNaN(numeric) && numeric > 0 && /^\d/.test(raw)) {
      useCountUp(el, numeric, raw.replace(/^[\d.]+/, ''))
    }
  })

  if (!canAnimate() || !root.value || !track.value) return
  const { gsap, ScrollTrigger } = await loadGsap()
  ctx = gsap.context(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 1024px)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]')
      const distance = () => Math.max(0, track.value!.scrollWidth - window.innerWidth)
      const tween = gsap.to(track.value, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: root.value, start: 'top top', end: 'bottom bottom',
          scrub: 0.7, invalidateOnRefresh: true,
          onUpdate: ({ progress }) => { index.value = Math.min(panels.length, Math.floor(progress * panels.length) + 1) },
        },
      })
      return () => tween.kill()
    })

    // Keyboard users tab through the panels; move the track to whichever panel has focus.
    gsap.utils.toArray<HTMLElement>('[data-panel]').forEach((panel, panelIndex) => {
      panel.addEventListener('focusin', () => {
        if (window.innerWidth < 1024 || !root.value) return
        const top = root.value.offsetTop
        const span = root.value.offsetHeight - window.innerHeight
        const target = top + (span * panelIndex) / Math.max(1, items.length - 1)
        if (Math.abs(window.scrollY - target) > 40) window.scrollTo({ top: target, behavior: 'auto' })
      })
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="track">
    <div class="track__viewport">
      <div ref="track" class="track__rail">
      <article v-for="(project, i) in items" :key="project.slug" class="panel" data-panel>
        <div class="panel__text">
          <p class="mono">{{ String(i + 1).padStart(2, '0') }} / {{ String(items.length).padStart(2, '0') }}</p>
          <h3 class="panel__title">{{ project.title }}</h3>
          <p class="panel__subtitle">{{ project.subtitle }}</p>
          <p class="panel__meta mono">
            {{ project.org }} · {{ project.dates }}
            <span class="chip panel__access">{{ project.access }}</span>
          </p>
          <p class="panel__summary measure">{{ project.summary }}</p>
          <ul v-if="project.metrics?.length" class="panel__metrics">
            <li v-for="metric in project.metrics" :key="metric.label">
              <span class="panel__metricValue num" :data-metric-value="metric.value">{{ metric.value }}</span>
              <span class="mono">{{ metric.label }}</span>
            </li>
          </ul>
          <ul class="panel__stack">
            <li v-for="item in project.stack" :key="item" class="chip">{{ item }}</li>
          </ul>
          <NuxtLink class="panel__cta" :to="`/work/${project.slug}`" data-magnetic data-cursor="Open">
            <span data-magnetic-label>Open case study →</span>
          </NuxtLink>
        </div>

        <NuxtLink class="panel__visual" :to="`/work/${project.slug}`" :aria-label="`Open the ${project.title} case study`" data-cursor="View">
          <ScreenStack v-if="project.images?.length" :images="project.images" />
          <TypographicPanel v-else :steps="['4 vendors evaluated', '1 build-vs-buy call', 'in production']" />
        </NuxtLink>
        </article>
      </div>

      <div class="track__progress hide-sm" aria-hidden="true">
      <span class="track__bar"><span class="track__fill" :style="{ transform: `scaleX(${index / items.length})` }" /></span>
        <span class="mono num">{{ String(index).padStart(2, '0') }} / {{ String(items.length).padStart(2, '0') }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.track { position: relative; --panels: 5; }
.track__viewport { overflow: hidden; }
@media (min-width: 1024px) {
  /* One screen per panel, so the page is the right height before any script runs. */
  .track { height: calc(100svh + (var(--panels) - 1) * 100vw); }
  .track__viewport { position: sticky; top: 0; height: 100svh; }
}
.track__rail { display: flex; }
.panel {
  flex: none; width: 100vw; min-height: 100svh; display: grid; grid-template-columns: 40fr 60fr;
  gap: clamp(24px, 4vw, 72px); align-items: center; padding: 120px clamp(24px, 5vw, 96px) 96px;
}
.panel__text { display: flex; flex-direction: column; gap: 14px; }
.panel__title { font-size: var(--text-h2); }
.panel__subtitle { font-size: var(--text-lead); color: var(--ink-2); }
.panel__meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.panel__access { font-size: 10px; padding: 4px 10px; }
.panel__metrics { display: flex; flex-wrap: wrap; gap: 22px; margin-top: 4px; }
.panel__metrics li { display: flex; flex-direction: column; gap: 4px; max-width: 150px; }
.panel__metricValue { font-family: var(--font-display); font-size: 1.9rem; line-height: 1; }
.panel__stack { display: flex; flex-wrap: wrap; gap: 8px; }
.panel__cta { display: inline-block; margin-top: 8px; color: var(--accent); font-weight: 600; }
.panel__visual { display: block; }
.track__progress { position: absolute; left: clamp(24px, 5vw, 96px); bottom: 48px; z-index: 3; display: flex; align-items: center; gap: 16px; width: min(320px, 30vw); }
.track__bar { flex: 1; height: 2px; background: var(--line); overflow: hidden; }
.track__fill { display: block; height: 100%; background: var(--accent); transform-origin: left; transition: transform 160ms linear; }
@media (prefers-reduced-motion: reduce) {
  .track { height: auto; }
  .track__viewport { position: static; height: auto; }
  .track__rail { flex-direction: column; }
  .panel { width: 100%; min-height: 0; }
}
@media (max-width: 1023px) {
  .track__rail { flex-direction: column; }
  .panel { width: 100%; min-height: 0; grid-template-columns: 1fr; padding: 56px var(--gutter); border-bottom: 1px solid var(--line); }
  .panel__visual { order: -1; }
}
</style>
