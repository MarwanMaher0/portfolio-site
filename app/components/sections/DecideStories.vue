<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import site from '~~/content/site.json'
import { canAnimate, hasFinePointer, loadGsap } from '~/composables/useMotion'

const root = ref<HTMLElement | null>(null)
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null

onMounted(async () => {
  if (!canAnimate() || !root.value) return
  const { gsap } = await loadGsap()
  ctx = gsap.context(() => {
    gsap.from('[data-story]', {
      z: -180, rotateX: 10, opacity: 0, transformOrigin: 'center bottom', stagger: 0.12,
      scrollTrigger: { trigger: root.value, start: 'top 80%', end: 'top 30%', scrub: 0.6 },
    })
  }, root.value)

  if (!hasFinePointer()) return
  root.value.querySelectorAll<HTMLElement>('[data-story]').forEach((card) => {
    const tiltX = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3.out' })
    const tiltY = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3.out' })
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      tiltX(px * 12); tiltY(-py * 12)
      card.style.setProperty('--gx', `${(px + 0.5) * 100}%`)
      card.style.setProperty('--gy', `${(py + 0.5) * 100}%`)
    })
    card.addEventListener('pointerleave', () => { tiltX(0); tiltY(0) })
  })
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="stories container">
    <article v-for="story in site.decideStories" :key="story.title" class="story card" data-story>
      <p class="kicker">{{ story.kicker }}</p>
      <h3 class="story__title">{{ story.title }}</h3>
      <p class="story__body">{{ story.body }}</p>
    </article>
  </div>
</template>

<style scoped>
.stories { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 2vw, 28px); perspective: 1200px; }
.story { position: relative; padding: clamp(22px, 2.4vw, 34px); display: flex; flex-direction: column; gap: 14px; min-height: 340px; transform-style: preserve-3d; overflow: hidden; }
.story::after { content: ''; position: absolute; inset: 0; background: radial-gradient(240px circle at var(--gx, 50%) var(--gy, 0%), rgb(63 214 154 / 0.10), transparent 70%); opacity: 0; transition: opacity var(--dur-base); pointer-events: none; }
.story:hover::after { opacity: 1; }
.story__title { font-size: var(--text-h3); }
.story__body { color: var(--ink-2); margin-top: auto; }
@media (max-width: 860px) { .stories { grid-template-columns: 1fr; } .story { min-height: 0; } }
</style>
