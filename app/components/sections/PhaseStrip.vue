<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { canAnimate, loadGsap } from '~/composables/useMotion'

defineProps<{ tool: { name: string; tagline: string; tests: string; links: { label: string; href: string }[] } }>()
const phases = ['discover', 'requirements', 'design', 'build', 'test', 'release', 'operate']
const root = ref<HTMLElement | null>(null)
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null

onMounted(async () => {
  if (!canAnimate() || !root.value) return
  const { gsap } = await loadGsap()
  ctx = gsap.context(() => {
    gsap.to('[data-phase-chip]', {
      '--lit': 1, stagger: 0.12, ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top 85%', end: 'bottom 55%', scrub: 0.4 },
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="strip container">
    <div class="strip__head">
      <h3 class="strip__name">{{ tool.name }}</h3>
      <p class="strip__tagline">{{ tool.tagline }}</p>
    </div>
    <ul class="strip__chips">
      <li v-for="phase in phases" :key="phase" class="strip__chip" data-phase-chip>
        <span class="strip__dot" aria-hidden="true" />{{ phase }}
      </li>
    </ul>
    <p class="strip__links">
      <span class="chip chip--accent">{{ tool.tests }}</span>
      <a v-for="link in tool.links" :key="link.href" :href="link.href" target="_blank" rel="noopener" data-cursor="Open">{{ link.label }} →</a>
    </p>
  </div>
</template>

<style scoped>
.strip { display: flex; flex-wrap: wrap; align-items: center; gap: clamp(16px, 2.5vw, 40px); padding-block: clamp(28px, 4vh, 48px); border-block: 1px solid var(--line); }
.strip__name { font-size: var(--text-h3); }
.strip__tagline { color: var(--ink-2); font-size: 14px; }
.strip__chips { display: flex; flex-wrap: wrap; gap: 8px; flex: 1; }
.strip__chip {
  --lit: 0;
  display: inline-flex; align-items: center; gap: 8px; padding: 7px 13px; border-radius: var(--radius-pill);
  border: 1px solid color-mix(in srgb, var(--accent) calc(var(--lit) * 45%), var(--line));
  color: color-mix(in srgb, var(--ink) calc(var(--lit) * 100%), var(--ink-3));
  font-family: var(--font-mono); font-size: 11px; letter-spacing: var(--tracking-mono); text-transform: uppercase;
}
.strip__dot { width: 6px; height: 6px; border-radius: 50%; background: color-mix(in srgb, var(--accent) calc(var(--lit) * 100%), var(--line)); }
.strip__links { display: flex; align-items: center; gap: 18px; color: var(--accent); font-weight: 500; }
</style>
