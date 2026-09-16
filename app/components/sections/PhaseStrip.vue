<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { canAnimate, loadGsap } from '~/composables/useMotion'

type Phase = { id: string; question: string; output: string; skipped: string }
const props = defineProps<{
  tool: { name: string; tagline: string; tests: string; phases: Phase[]; links: { label: string; href: string }[] }
}>()

const root = ref<HTMLElement | null>(null)
const hovered = ref<number | null>(null)
const lit = ref(0)
const detail = computed(() => (hovered.value === null ? null : props.tool.phases[hovered.value]!))
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null

onMounted(async () => {
  if (!canAnimate() || !root.value) { lit.value = props.tool.phases.length; return }
  const { gsap, ScrollTrigger } = await loadGsap()
  ctx = gsap.context(() => {
    // The phases light up in order as the band crosses the viewport.
    ScrollTrigger.create({
      trigger: root.value, start: 'top 85%', end: 'bottom 65%', scrub: 0.4,
      onUpdate: ({ progress }) => { lit.value = Math.round(progress * props.tool.phases.length) },
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="strip container" aria-labelledby="strip-title">
    <div class="strip__head">
      <h3 id="strip-title" class="strip__name">{{ tool.name }}</h3>
      <!-- One line, whatever the state: the hovered phase replaces the tagline, so nothing shifts. -->
      <p class="strip__line" aria-live="polite">
        <template v-if="detail">
          <span class="strip__phase">{{ detail.id }}</span>{{ detail.question }}
        </template>
        <template v-else>{{ tool.tagline }}</template>
      </p>
    </div>

    <ul class="strip__chips" @pointerleave="hovered = null">
      <li v-for="(phase, index) in tool.phases" :key="phase.id">
        <button
          class="strip__chip" type="button" :class="{ 'is-lit': index < lit, 'is-active': hovered === index }"
          :aria-label="`${phase.id}: ${phase.question}`" data-cursor="View"
          @pointerenter="hovered = index" @focus="hovered = index" @blur="hovered = null" @click="hovered = index"
        >
          <span class="strip__dot" aria-hidden="true" />{{ phase.id }}
        </button>
      </li>
    </ul>

    <p class="strip__meta">
      <span class="chip chip--accent">{{ tool.tests }}</span>
      <a v-for="link in tool.links" :key="link.href" :href="link.href" target="_blank" rel="noopener" data-cursor="Open">{{ link.label }} →</a>
    </p>
  </section>
</template>

<style scoped>
.strip { display: flex; align-items: center; gap: clamp(16px, 2.5vw, 40px); padding-block: clamp(26px, 4vh, 40px); border-block: 1px solid var(--line); }
.strip__head { min-width: 0; flex: 0 1 230px; }
.strip__name { font-size: var(--text-h3); }
.strip__line { color: var(--ink-2); font-size: 14px; min-height: 1.5em; }
.strip__phase { font-family: var(--font-mono); font-size: 11px; letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--accent); margin-right: 8px; }

.strip__chips { display: flex; flex: 1 1 auto; min-width: 0; flex-wrap: nowrap; gap: clamp(4px, 0.5vw, 8px); justify-content: center; overflow-x: auto; scrollbar-width: none; }
.strip__chips::-webkit-scrollbar { display: none; }
.strip__chip {
  display: inline-flex; align-items: center; gap: 8px; white-space: nowrap;
  padding: 6px clamp(8px, 0.8vw, 12px); border-radius: var(--radius-pill); border: 1px solid var(--line); color: var(--ink-3);
  font-family: var(--font-mono); font-size: clamp(9.5px, 0.78vw, 11px); letter-spacing: 0.02em; text-transform: uppercase;
  transition: border-color var(--dur-fast), color var(--dur-fast), background var(--dur-fast);
}
.strip__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--line); transition: background var(--dur-fast); }
.strip__chip.is-lit { border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); color: var(--ink-2); }
.strip__chip.is-lit .strip__dot { background: var(--accent); }
.strip__chip.is-active { color: var(--ink); border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }

.strip__meta { display: flex; align-items: center; gap: 14px; flex: none; color: var(--accent); font-weight: 500; }

@media (max-width: 1100px) {
  .strip { flex-wrap: wrap; }
  .strip__chips { order: 3; width: 100%; justify-content: flex-start; padding-bottom: 4px; }
  .strip__meta { margin-left: auto; }
}
</style>
