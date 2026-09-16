<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { canAnimate, loadGsap } from '~/composables/useMotion'
import { useScene } from '~/composables/useScene'

const props = defineProps<{
  chapter: { id: string; number: string; title: string; headline: string; intro: string }
  band: [number, number]
}>()

const root = ref<HTMLElement | null>(null)
const { journey, opacity, staticFallback } = useScene()
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null

onMounted(async () => {
  if (!canAnimate() || !root.value) return
  const { gsap, ScrollTrigger } = await loadGsap()
  ctx = gsap.context(() => {
    // The stage is sticky in CSS, so the page height never changes when this
    // component hydrates. GSAP only reads progress and drives the animation.
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.value, start: 'top top', end: 'bottom bottom', scrub: 0.6,
        onUpdate: ({ progress }) => journey(props.band[0] + progress * (props.band[1] - props.band[0])),
        onToggle: ({ isActive }) => { if (isActive) opacity(1) },
      },
    })
    timeline
      .from('[data-gate-title]', { scale: 0.92, opacity: 0, duration: 0.3, ease: 'none' })
      .from('[data-gate-copy]', { y: 30, opacity: 0, duration: 0.25, ease: 'none' }, 0.05)
      .to('[data-gate-title]', { scale: 1.5, opacity: 0, duration: 0.35, ease: 'none' }, 0.35)
      .to('[data-gate-copy]', { opacity: 0, duration: 0.2, ease: 'none' }, 0.35)
      .fromTo('[data-gate-wipe]',
        { clipPath: 'inset(35% 39% 35% 39% round var(--radius-gate))' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.35, ease: 'none' }, 0.65)
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section :id="chapter.id" ref="root" class="gate" :class="`gate--${chapter.id}`">
    <div class="gate__stage">
      <img v-if="staticFallback" class="gate__still" src="/brand/phase-gates-still.webp" alt="" width="1600" height="1000">
      <div class="gate__frame" data-gate-title>
        <span class="gate__number mono">{{ chapter.number }}</span>
        <span class="gate__title">{{ chapter.title }}</span>
      </div>
      <div class="gate__copy" data-gate-copy>
        <h2 class="gate__headline">{{ chapter.headline }}</h2>
        <p class="gate__intro">{{ chapter.intro }}</p>
      </div>
      <div class="gate__wipe" data-gate-wipe />
    </div>
  </section>
</template>

<style scoped>
/* The section owns the scroll length; the stage sticks inside it. No pin spacers. */
.gate { position: relative; z-index: 1; height: 320svh; }
.gate__stage { position: sticky; top: 0; height: 100svh; display: grid; place-items: center; overflow: hidden; }
.gate__still { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) scale(1.15); width: 120%; opacity: 0.4; }
.gate__frame {
  position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
  width: min(340px, 62vw); aspect-ratio: 34 / 45; border: var(--gate-stroke) solid var(--phase);
  border-radius: calc(var(--radius-gate) * 1.3);
  box-shadow: 0 0 60px var(--phase-glow), inset 0 0 40px var(--phase-glow);
}
.gate__number { color: var(--phase); }
.gate__title { font-family: var(--font-display); font-size: clamp(2.6rem, 6.5vw, 6rem); line-height: 1; letter-spacing: -0.02em; color: var(--phase); }
.gate__copy { position: absolute; left: 50%; bottom: clamp(48px, 9vh, 96px); transform: translateX(-50%); width: min(720px, 88vw); text-align: center; display: flex; flex-direction: column; gap: 14px; }
.gate__headline { font-size: var(--text-h3); }
.gate__intro { color: var(--ink-2); }
.gate__wipe { position: absolute; inset: 0; background: var(--surface); pointer-events: none; clip-path: inset(100% 100% 100% 100% round var(--radius-gate)); }
.gate--decide { --phase: var(--phase-decide); --phase-glow: var(--glow-decide); }
.gate--ship { --phase: var(--phase-ship); --phase-glow: rgb(234 242 236 / 0.12); }
.gate--learn { --phase: var(--phase-learn); --phase-glow: var(--glow-learn); }
@media (max-width: 767px) { .gate { height: 260svh; } }
@media (prefers-reduced-motion: reduce) {
  .gate { height: auto; }
  .gate__stage { position: static; height: auto; min-height: 0; padding-block: var(--section-pad); }
  .gate__copy { position: static; transform: none; margin-top: 32px; }
  .gate__wipe { display: none; }
}
</style>
