<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import site from '~~/content/site.json'
import { canAnimate, loadGsap } from '~/composables/useMotion'

const data = site.principles
const root = ref<HTMLElement | null>(null)
const current = ref(0)
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null

onMounted(async () => {
  if (!canAnimate() || !root.value) return
  const { gsap, ScrollTrigger } = await loadGsap()
  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-principle]').forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item, start: 'top 60%', end: 'bottom 55%',
        onToggle: ({ isActive }) => { if (isActive) current.value = index },
      })
      gsap.fromTo(item.querySelector('[data-principle-line]'),
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: item, start: 'top 80%', end: 'bottom 60%', scrub: 0.5 } })
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="principles container">
    <div class="principles__sticky hide-sm" aria-hidden="true">
      <span class="principles__numberWrap">
        <transition name="roll" mode="out-in">
          <span :key="current" class="principles__number">{{ data.items[current].number }}</span>
        </transition>
      </span>
      <h2 class="h3">{{ data.title }}</h2>
    </div>
    <ol class="principles__list">
      <li v-for="item in data.items" :key="item.number" class="principles__item" data-principle>
        <span class="mono hide-lg">{{ item.number }}</span>
        <h3 class="principles__title">{{ item.title }}</h3>
        <p class="measure">{{ item.body }}</p>
        <span class="principles__line" data-principle-line />
      </li>
    </ol>
  </div>
</template>

<style scoped>
.principles { display: grid; grid-template-columns: 4fr 8fr; gap: clamp(24px, 4vw, 64px); }
.principles__sticky { position: sticky; top: 140px; align-self: start; display: flex; flex-direction: column; gap: 20px; }
.principles__numberWrap { display: block; overflow: hidden; height: clamp(5rem, 11vw, 9rem); }
.principles__number { display: block; font-family: var(--font-display); font-size: clamp(5rem, 11vw, 9rem); line-height: 1; color: var(--phase-learn); }
.principles__list { display: flex; flex-direction: column; gap: clamp(32px, 5vw, 64px); }
.principles__item { display: flex; flex-direction: column; gap: 12px; }
.principles__title { font-size: var(--text-h3); }
.principles__line { height: 1px; background: var(--accent-2); transform-origin: left; opacity: 0.5; margin-top: 10px; }
.roll-enter-active, .roll-leave-active { transition: transform 0.5s var(--ease-out), opacity 0.5s; }
.roll-enter-from { transform: translateY(100%); opacity: 0; }
.roll-leave-to { transform: translateY(-100%); opacity: 0; }
@media (max-width: 1023px) { .principles { grid-template-columns: 1fr; } }
</style>
