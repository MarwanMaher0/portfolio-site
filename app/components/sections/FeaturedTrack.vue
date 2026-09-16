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
    // The counter names whichever panel covers the screen. It reads the rail's
    // live position, because the scrub animation lags the scroll by design.
    const panels = gsap.utils.toArray<HTMLElement>('[data-panel]')
    const syncIndex = () => {
      let best = 0
      let bestScore = -Infinity
      panels.forEach((panel, i) => {
        const rect = panel.getBoundingClientRect()
        const horizontal = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0)
        const vertical = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        const score = window.innerWidth >= 1024 ? horizontal : vertical
        if (score > bestScore) { bestScore = score; best = i }
      })
      index.value = best + 1
    }
    syncIndex()
    window.addEventListener('scroll', syncIndex, { passive: true })
    window.addEventListener('resize', syncIndex)

    // Held so the focus handler can drive the same tween the scroll drives.
    let rail: gsap.core.Tween | null = null
    const media = gsap.matchMedia()
    media.add('(min-width: 1024px)', () => {
      const distance = () => Math.max(0, track.value!.scrollWidth - window.innerWidth)
      const tween = gsap.to(track.value, {
        x: () => -distance(), ease: 'none', onUpdate: syncIndex,
        scrollTrigger: {
          trigger: root.value, start: 'top top', end: 'bottom bottom',
          scrub: 0.7, invalidateOnRefresh: true,
        },
      })
      rail = tween
      return () => { rail = null; tween.kill() }
    })

    // The sticky window only ever moves by the rail's transform, so a browser
    // that scrolls it to reveal a focused child leaves every panel shifted.
    const viewport = root.value!.querySelector<HTMLElement>('.track__viewport')
    const unscroll = () => {
      if (!viewport) return
      if (viewport.scrollLeft) viewport.scrollLeft = 0
      if (viewport.scrollTop) viewport.scrollTop = 0
    }
    viewport?.addEventListener('scroll', unscroll)

    // Keyboard users tab through the panels. The browser's own scroll-into-view
    // moves the page by the panel's horizontal offset, which throws the reader
    // far up the document, so put the scroll exactly where the panel belongs
    // after the browser has had its go. Setting the rail by hand is not enough:
    // the scrub tween would keep easing it back from wherever it was, and the
    // link stays off screen for most of a second. Feed the new scroll position
    // to the ScrollTrigger and finish that tween instead, so the rail is already
    // where the reader is looking, and hold it there for a few frames, because
    // browsers run their scroll-into-view after the focus event, not before it.
    let holding = 0
    gsap.utils.toArray<HTMLElement>('[data-panel]').forEach((panel, panelIndex) => {
      panel.addEventListener('focusin', () => {
        if (window.innerWidth < 1024 || !root.value) return
        const place = () => {
          unscroll()
          const top = root.value!.getBoundingClientRect().top + window.scrollY
          const span = root.value!.offsetHeight - window.innerHeight
          const target = Math.round(top + (span * panelIndex) / Math.max(1, items.length - 1))
          if (Math.abs(window.scrollY - target) > 1) window.scrollTo({ top: target, behavior: 'auto' })
          const trigger = rail?.scrollTrigger
          if (trigger) {
            ScrollTrigger.update()
            const scrub = trigger.getTween?.()
            if (scrub) scrub.progress(1)
            else rail!.progress(trigger.progress)
          }
          syncIndex()
        }
        const mine = ++holding
        const hold = (frame: number) => {
          if (mine !== holding) return
          place()
          if (frame < 12) requestAnimationFrame(() => hold(frame + 1))
        }
        hold(0)
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
          <ScreenStack v-if="project.images?.length" :images="project.images" :eager="i === 0" />
          <TypographicPanel v-else :steps="['4 vendors evaluated', '1 build-vs-buy call', 'in production']" />
        </NuxtLink>
        </article>
      </div>

      <div class="track__progress" aria-hidden="true">
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
  .track__progress { position: absolute; left: clamp(24px, 5vw, 96px); bottom: 48px; margin: 0; width: min(320px, 30vw); }
  /* One screen per panel, so the page is the right height before any script runs. */
  .track { height: calc(100svh + (var(--panels) - 1) * 100vw); }
  .track__viewport { position: sticky; top: 0; height: 100svh; }
  /* Each panel is exactly one screen: nothing may spill outside the sticky window. */
  .track__rail { height: 100%; }
  .panel { height: 100%; min-height: 0; padding: 104px clamp(24px, 5vw, 96px) 80px; }
  .panel__text { min-height: 0; }
  .panel__visual { min-height: 0; height: 100%; display: grid; align-items: center; }
}
.track__rail { display: flex; }
.panel {
  flex: none; width: 100vw; min-height: 100svh; display: grid; grid-template-columns: 40fr 60fr;
  gap: clamp(24px, 4vw, 72px); align-items: center; padding: 120px clamp(24px, 5vw, 96px) 96px;
}
.panel__text { display: flex; flex-direction: column; gap: clamp(8px, 1.4vh, 14px); }
.panel__title { font-size: var(--text-h2); }
.panel__subtitle { font-size: var(--text-lead); color: var(--ink-2); }
.panel__meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.panel__access { font-size: 10px; padding: 4px 10px; }
.panel__metrics { display: flex; flex-wrap: wrap; gap: 22px; margin-top: 4px; }
.panel__metrics li { display: flex; flex-direction: column; gap: 4px; max-width: 150px; }
.panel__metricValue { font-family: var(--font-display); font-size: clamp(1.4rem, 1.9vh, 1.9rem); line-height: 1; }
.panel__stack { display: flex; flex-wrap: wrap; gap: 8px; }
.panel__cta { display: inline-block; margin-top: 8px; color: var(--accent); font-weight: 600; }
.panel__visual { display: block; }
.track__progress { position: sticky; bottom: 24px; margin: 0 auto; width: min(320px, 70vw); z-index: 3; display: flex; align-items: center; gap: 16px; width: min(320px, 30vw); }
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
