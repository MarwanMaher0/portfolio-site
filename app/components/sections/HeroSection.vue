<script setup lang="ts">
import { onMounted, ref } from 'vue'
import site from '~~/content/site.json'
import { canAnimate, loadGsap } from '~/composables/useMotion'
import { useCountUp } from '~/composables/useReveal'
import { useScene } from '~/composables/useScene'
import { useLenis } from '~/composables/useLenis'

const root = ref<HTMLElement | null>(null)
const statRefs = ref<HTMLElement[]>([])
const { journey, opacity } = useScene()
const { scrollTo } = useLenis()

onMounted(async () => {
  site.hero.stats.forEach((stat, i) => {
    const el = statRefs.value[i]
    if (el) useCountUp(el, stat.value, stat.suffix)
  })
  if (!canAnimate() || !root.value) return
  const { gsap, ScrollTrigger } = await loadGsap()
  const ctx = gsap.context(() => {
    gsap.to('[data-hero-text]', {
      yPercent: -14, opacity: 0.25, ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to('[data-hero-photo-frame]', {
      yPercent: -6, ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
    })
    ScrollTrigger.create({
      trigger: root.value, start: 'top 60%', end: 'bottom top',
      onToggle: ({ isActive }) => { if (isActive) { journey(0); opacity(0.9) } },
    })
  }, root.value)
  return () => ctx.revert()
})
</script>

<template>
  <section id="top" ref="root" class="hero">
    <div class="container hero__grid">
      <div class="hero__text" data-hero-text>
        <p class="hero__eyebrow" data-hero-fade>
          <span class="hero__dot" aria-hidden="true" />{{ site.hero.eyebrow }}
        </p>
        <h1 class="hero__name">
          <span class="hero__mask"><span data-hero-line>Marwan</span></span>
          <span class="hero__mask"><span data-hero-line>Maher</span></span>
        </h1>
        <p class="hero__role" data-hero-fade>{{ site.hero.headline }}</p>
        <p class="hero__sub" data-hero-fade>{{ site.hero.sub }}</p>
        <p class="hero__motto" data-hero-fade>
          <a class="phase-decide" href="#decide" @click.prevent="scrollTo('#decide')">Decide</a>
          <span aria-hidden="true">·</span>
          <a class="phase-ship" href="#ship" @click.prevent="scrollTo('#ship')">Ship</a>
          <span aria-hidden="true">·</span>
          <a class="phase-learn" href="#learn" @click.prevent="scrollTo('#learn')">Learn</a>
        </p>
        <ul class="hero__stats" data-hero-fade>
          <li v-for="(stat, index) in site.hero.stats" :key="stat.label">
            <span :ref="el => { if (el) statRefs[index] = el as HTMLElement }" class="hero__stat num">{{ stat.value }}{{ stat.suffix }}</span>
            <span class="mono hero__statLabel">{{ stat.label }}</span>
          </li>
        </ul>
        <div class="hero__ctas" data-hero-fade>
          <a class="btn btn--primary" href="#ship" data-magnetic data-cursor="View" @click.prevent="scrollTo('#ship')">
            <span data-magnetic-label>{{ site.hero.ctaPrimary.label }}</span>
          </a>
          <a class="btn btn--ghost" :href="site.cv[0].file" download data-magnetic data-cursor="Open">
            <span data-magnetic-label>{{ site.hero.ctaSecondary.label }}</span>
          </a>
        </div>
      </div>

      <div class="hero__photo" data-hero-photo-frame>
        <div class="hero__frame">
          <AppImage
            class="hero__img" :src="site.person.photo.src" :alt="site.person.photo.alt" eager
            sizes="(max-width: 1023px) 72vw, 34vw"
          />
        </div>
      </div>
    </div>

    <p class="hero__scroll mono" aria-hidden="true">{{ site.hero.scrollHint }}<span class="hero__scrollLine" /></p>
  </section>
</template>

<style scoped>
.hero { position: relative; z-index: 1; min-height: 100svh; display: flex; align-items: center; padding-block: 128px 80px; }
.hero__grid { display: grid; grid-template-columns: 7fr 5fr; gap: clamp(24px, 4vw, 64px); align-items: center; }
.hero__text { display: flex; flex-direction: column; gap: 22px; }
.hero__eyebrow { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--text-mono); letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--ink-3); }
.hero__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px var(--glow-decide); }
.hero__name { font-size: var(--text-hero); letter-spacing: -0.025em; }
.hero__mask { display: block; overflow: hidden; }
.hero__mask > span { display: block; animation: hero-rise 1s var(--ease-out) both; }
.hero__mask:nth-of-type(2) > span { animation-delay: 80ms; }
[data-hero-fade] { animation: hero-fade 0.8s var(--ease-out) both; animation-delay: 220ms; }
.hero__role[data-hero-fade] { animation-delay: 280ms; }
.hero__sub[data-hero-fade] { animation-delay: 340ms; }
.hero__motto[data-hero-fade] { animation-delay: 400ms; }
.hero__stats[data-hero-fade] { animation-delay: 460ms; }
.hero__ctas[data-hero-fade] { animation-delay: 520ms; }
@keyframes hero-rise { from { transform: translateY(110%); } to { transform: none; } }
@keyframes hero-fade { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hero__mask > span, [data-hero-fade] { animation: none; }
}
.hero__role { font-size: clamp(1.15rem, 1.7vw, 1.4rem); font-weight: 500; }
.hero__sub { max-width: 52ch; color: var(--ink-2); }
.hero__motto { display: flex; gap: 12px; font-family: var(--font-mono); font-size: 14px; letter-spacing: var(--tracking-mono); }
.hero__motto span { color: var(--ink-3); }
.hero__stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(16px, 2.4vw, 36px); }
.hero__stats li { display: flex; flex-direction: column; gap: 6px; }
.hero__stat { font-family: var(--font-display); font-size: clamp(2rem, 3.4vw, 3rem); line-height: 1; }
.hero__statLabel { line-height: 1.4; }
.hero__ctas { display: flex; flex-wrap: wrap; gap: 14px; }
.hero__photo { justify-self: end; width: 100%; max-width: 460px; }
.hero__frame { position: relative; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-gate); aspect-ratio: 44 / 54; margin-top: 9%; }
.hero__img { position: absolute; left: -2%; bottom: 0; width: 104%; max-width: none; }
.hero__scroll { position: absolute; left: var(--gutter); bottom: 32px; display: flex; align-items: center; gap: 14px; }
.hero__scrollLine { width: 1px; height: 40px; background: var(--ink-2); display: block; }
@media (max-width: 1023px) {
  .hero { padding-block: 104px 64px; }
  .hero__grid { grid-template-columns: 1fr; }
  .hero__photo { order: -1; justify-self: center; max-width: min(72vw, 340px); }
  
  .hero__ctas .btn { flex: 1; justify-content: center; }
  .hero__scroll { display: none; }
}
</style>
