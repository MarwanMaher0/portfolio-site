<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import site from '~~/content/site.json'
import oss from '~~/content/open-source.json'
import { canAnimate, loadGsap } from '~/composables/useMotion'

const data = site.rtlLab
const isolated = ref(false)
const touched = ref(false)
const hydrated = ref(false)
const root = ref<HTMLElement | null>(null)
const tools = oss.tools.filter((tool) => data.tools.includes(tool.slug))
let observer: IntersectionObserver | null = null
let timer: number | undefined

const chars = (value: string) => Array.from(value)

/** Flips the switch and animates each character to its new position. */
async function toggle(next = !isolated.value, fromUser = true) {
  if (fromUser) touched.value = true
  if (!canAnimate() || !root.value) { isolated.value = next; return }
  const { Flip } = await loadGsap()
  const state = Flip.getState(root.value.querySelectorAll('[data-char]'))
  isolated.value = next
  await nextTick()
  Flip.from(state, { duration: 0.6, ease: 'power2.inOut', stagger: 0.012, absolute: false })
}

onMounted(async () => {
  hydrated.value = true
  if (!root.value || !canAnimate()) return
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting && !touched.value && !isolated.value) {
      timer = window.setTimeout(() => { if (!touched.value) toggle(true, false) }, 1200)
    }
  }, { threshold: 0.6 })
  observer.observe(root.value)
})
onBeforeUnmount(() => { observer?.disconnect(); window.clearTimeout(timer) })
</script>

<template>
  <section :id="data.id" ref="root" class="lab surface" :data-hydrated="hydrated ? 'true' : 'false'">
    <div class="container lab__inner">
      <header class="lab__head">
        <p class="kicker">{{ data.kicker }}</p>
        <h2 class="h2">{{ data.title }}</h2>
        <p class="lead">{{ data.intro }}</p>
        <div class="lab__switchRow">
          <button
            class="lab__switch" type="button" role="switch" :aria-checked="isolated"
            data-cursor="Flip" @click="toggle()"
          >
            <span class="lab__knob" />
            <span class="visually-hidden">Isolate the values. Only the on-screen order changes; the data never changes.</span>
          </button>
          <span class="lab__switchLabel">{{ isolated ? data.toggleOn : data.toggleOff }}</span>
        </div>
      </header>

      <ul class="lab__grid">
        <li v-for="sample in data.samples" :key="sample.label" class="lab__card card">
          <span class="chip">{{ sample.label }}</span>
          <p class="lab__sentence" dir="rtl" lang="ar">
            <span>{{ sample.before }}</span><bdi v-if="isolated" class="lab__value is-fixed"><span
              v-for="(char, i) in chars(sample.value)" :key="`on-${i}`" data-char
            >{{ char }}</span></bdi><span v-else class="lab__value is-broken"><span
              v-for="(char, i) in chars(sample.value)" :key="`off-${i}`" data-char
            >{{ char }}</span></span><span>{{ sample.after }}</span>
          </p>
          <p class="lab__translation mono">{{ sample.translation }}</p>
        </li>
      </ul>

      <p class="lab__verified mono">{{ data.verified }}</p>

      <div class="lab__tools">
        <article v-for="tool in tools" :key="tool.slug" class="lab__tool card">
          <div class="lab__toolShot frame">
            <AppImage :src="tool.image.src" :alt="tool.image.alt" sizes="(max-width: 900px) 92vw, 44vw" />
          </div>
          <div class="lab__toolText">
            <h3 class="h3">{{ tool.name }}</h3>
            <p class="measure">{{ tool.description }}</p>
            <p class="lab__toolMeta">
              <span class="chip chip--accent">{{ tool.tests }}</span>
              <a v-for="link in tool.links" :key="link.href" :href="link.href" target="_blank" rel="noopener" data-cursor="Open">{{ link.label }} →</a>
            </p>
          </div>
        </article>
      </div>

      <p class="lab__closing measure">{{ data.closing }}</p>
    </div>
  </section>
</template>

<style scoped>
.lab { padding-block: var(--section-pad); }
.lab__inner { display: flex; flex-direction: column; gap: clamp(28px, 4vw, 52px); }
.lab__head { display: flex; flex-direction: column; gap: 16px; }
.lab__switchRow { display: flex; align-items: center; gap: 14px; margin-top: 6px; }
.lab__switch { width: 64px; height: 34px; border-radius: var(--radius-pill); background: var(--line); position: relative; transition: background var(--dur-base); }
.lab__switch[aria-checked='true'] { background: var(--accent); }
.lab__knob { position: absolute; top: 4px; left: 4px; width: 26px; height: 26px; border-radius: 50%; background: var(--ink); transition: transform var(--dur-base) var(--ease-out), background var(--dur-base); }
.lab__switch[aria-checked='true'] .lab__knob { transform: translateX(30px); background: var(--bg); }
.lab__switchLabel { font-family: var(--font-mono); font-size: var(--text-mono); letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--ink-2); }
.lab__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(14px, 2vw, 24px); }
.lab__card { padding: clamp(18px, 2.2vw, 28px); display: flex; flex-direction: column; gap: 14px; }
.lab__sentence { font-family: 'IBM Plex Sans Arabic', var(--font-body); font-size: clamp(1.15rem, 1.6vw, 1.6rem); line-height: 1.9; }
.lab__value { padding-bottom: 2px; }
.lab__value.is-broken { border-bottom: 2px solid var(--accent-2); }
.lab__value.is-fixed { border-bottom: 2px solid var(--accent); }
.lab__translation { text-transform: none; }
.lab__verified { text-transform: none; }
.lab__tools { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(14px, 2vw, 24px); }
.lab__tool { padding: clamp(18px, 2.2vw, 26px); display: flex; flex-direction: column; gap: 16px; }
.lab__toolText { display: flex; flex-direction: column; gap: 10px; }
.lab__toolMeta { display: flex; align-items: center; gap: 16px; color: var(--accent); font-weight: 500; }
@media (max-width: 860px) { .lab__grid, .lab__tools { grid-template-columns: 1fr; } }
</style>
