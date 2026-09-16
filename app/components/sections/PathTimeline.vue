<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import site from '~~/content/site.json'
import { canAnimate, loadGsap } from '~/composables/useMotion'

const data = site.path
const root = ref<HTMLElement | null>(null)
const line = ref<SVGPathElement | null>(null)
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null

onMounted(async () => {
  if (!canAnimate() || !root.value || !line.value) return
  const { gsap } = await loadGsap()
  const length = line.value.getTotalLength()
  ctx = gsap.context(() => {
    gsap.set(line.value, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(line.value, {
      strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top 75%', end: 'bottom 75%', scrub: 0.5 },
    })
    gsap.utils.toArray<HTMLElement>('[data-node]').forEach((node) => {
      gsap.to(node, {
        '--fill': 1, ease: 'none',
        scrollTrigger: { trigger: node, start: 'top 72%', end: 'top 55%', scrub: 0.4 },
      })
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="path" ref="root" class="path surface">
    <div class="container">
      <header class="path__head">
        <h2 class="h2">{{ data.title }}</h2>
        <p class="lead">{{ data.intro }}</p>
      </header>

      <div class="path__body">
        <svg class="path__line hide-sm" viewBox="0 0 2 1000" preserveAspectRatio="none" aria-hidden="true">
          <path ref="line" d="M1 0 L1 1000" stroke="var(--accent)" stroke-width="2" fill="none" />
        </svg>
        <ol class="path__list">
          <li
            v-for="(item, index) in data.items" :key="item.title + item.dates"
            class="path__item" :class="[index % 2 ? 'path__item--right' : 'path__item--left', { 'path__item--edu': item.kind === 'education' }]"
            data-node
          >
            <span class="path__node" aria-hidden="true" />
            <div class="path__card">
              <p class="mono">{{ item.dates }}</p>
              <h3 class="path__title">{{ item.title }}</h3>
              <p class="path__org">{{ item.org }}<span v-if="item.current" class="chip chip--accent path__now">Now</span></p>
              <p class="measure">{{ item.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.path { padding-block: var(--section-pad); }
.path__head { display: flex; flex-direction: column; gap: 14px; margin-bottom: clamp(36px, 6vw, 72px); }
.path__body { position: relative; }
.path__line { position: absolute; left: 50%; top: 0; height: 100%; width: 2px; transform: translateX(-50%); }
.path__list { display: flex; flex-direction: column; gap: clamp(28px, 4vw, 48px); }
.path__item { --fill: 0; position: relative; width: 50%; padding-inline: clamp(20px, 3vw, 48px); }
.path__item--left { align-self: flex-start; text-align: right; }
.path__item--right { align-self: flex-end; }
.path__node { position: absolute; top: 6px; width: 14px; height: 20px; border-radius: 5px; border: 2px solid var(--line); background: color-mix(in srgb, var(--accent) calc(var(--fill) * 100%), transparent); }
.path__item--edu .path__node { background: color-mix(in srgb, var(--ink-3) calc(var(--fill) * 100%), transparent); }
.path__item--left .path__node { right: -7px; }
.path__item--right .path__node { left: -7px; }
.path__card { display: flex; flex-direction: column; gap: 8px; }
.path__item--left .path__card { align-items: flex-end; }
.path__title { font-family: var(--font-display); font-size: var(--text-h3); }
.path__org { color: var(--ink-2); display: flex; align-items: center; gap: 10px; }
.path__now { font-size: 10px; padding: 3px 9px; }
@media (max-width: 1023px) {
  .path__item, .path__item--left, .path__item--right { width: 100%; align-self: stretch; text-align: left; padding-inline: 22px 0; }
  .path__item--left .path__card { align-items: flex-start; }
  .path__node, .path__item--left .path__node, .path__item--right .path__node { left: 0; right: auto; }
  .path__list { border-left: 1px solid var(--line); padding-left: 8px; }
}
</style>
