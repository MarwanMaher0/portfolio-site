<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import site from '~~/content/site.json'
import { canAnimate, hasFinePointer, loadGsap } from '~/composables/useMotion'
import { useScene } from '~/composables/useScene'

const data = site.contact
const person = site.person
const root = ref<HTMLElement | null>(null)
const copied = ref(false)
const { journey, opacity } = useScene()
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null
let cleanup: (() => void) | null = null

const words = data.headline.split(' ').map((word) => Array.from(word))

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(person.email)
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 2200)
  } catch { window.location.href = `mailto:${person.email}` }
}

onMounted(async () => {
  if (!canAnimate() || !root.value) return
  const { gsap, ScrollTrigger } = await loadGsap()
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: root.value, start: 'top 70%', end: 'bottom bottom',
      onToggle: ({ isActive }) => { if (isActive) { journey(1); opacity(1) } },
    })
  }, root.value)

  if (!hasFinePointer()) return
  const nodes = Array.from(root.value.querySelectorAll<HTMLElement>('[data-letter]'))
  const setters = nodes.map((node) => ({
    node,
    y: gsap.quickTo(node, 'y', { duration: 0.6, ease: 'power3.out' }),
    color: gsap.quickSetter(node, 'color'),
  }))
  const move = (event: PointerEvent) => {
    setters.forEach(({ node, y, color }) => {
      const rect = node.getBoundingClientRect()
      const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2))
      const pull = Math.max(0, 1 - distance / 140)
      y(-10 * pull)
      color(pull > 0.05 ? `color-mix(in srgb, var(--accent-2) ${Math.round(pull * 100)}%, var(--ink))` : 'var(--ink)')
    })
  }
  window.addEventListener('pointermove', move)
  cleanup = () => window.removeEventListener('pointermove', move)
})
onBeforeUnmount(() => { ctx?.revert(); cleanup?.() })
</script>

<template>
  <section id="contact" ref="root" class="contact">
    <div class="container contact__inner">
      <p class="kicker">{{ data.kicker }}</p>
      <h2 class="contact__headline">
        <span v-for="(letter, index) in letters" :key="index" class="contact__letter" data-letter>{{ letter === ' ' ? ' ' : letter }}</span>
      </h2>
      <p class="lead contact__line">{{ data.line }}</p>

      <div class="contact__actions">
        <button class="btn btn--primary contact__email" type="button" data-magnetic data-cursor="Copy" @click="copyEmail">
          <span data-magnetic-label>{{ copied ? data.copiedLabel : person.email }}</span>
        </button>
        <a class="btn btn--ghost" :href="`mailto:${person.email}`" data-cursor="Open">Write an email</a>
      </div>

      <ul class="contact__links">
        <li><a :href="person.phoneHref">{{ person.phone }}</a></li>
        <li><a :href="person.linkedin" target="_blank" rel="noopener" data-cursor="Open">LinkedIn</a></li>
        <li><a :href="person.github" target="_blank" rel="noopener" data-cursor="Open">GitHub</a></li>
      </ul>

      <ul class="contact__cvs">
        <li v-for="cv in site.cv" :key="cv.file">
          <a :href="cv.file" download data-cursor="Open">
            <span class="contact__cvLabel">{{ cv.label }} CV</span>
            <span class="mono">{{ cv.hint }}</span>
          </a>
        </li>
      </ul>

      <p class="mono contact__meta">{{ person.location }} · {{ person.timezone }} · {{ person.languages.join(' · ') }}</p>
    </div>
  </section>
</template>

<style scoped>
.contact { position: relative; z-index: 1; min-height: 100svh; display: flex; align-items: center; padding-block: var(--section-pad); }
.contact__inner { display: flex; flex-direction: column; gap: 20px; }
.contact__headline { font-size: var(--text-hero); letter-spacing: -0.025em; }
.contact__word { display: inline-block; white-space: nowrap; }
.contact__word + .contact__word { margin-left: 0.28em; }
.contact__letter { display: inline-block; will-change: transform; }
.contact__line { margin-top: 6px; }
.contact__actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 10px; }
.contact__email { font-family: var(--font-mono); letter-spacing: 0.02em; }
.contact__links { display: flex; flex-wrap: wrap; gap: 28px; color: var(--ink-2); }
.contact__links a:hover { color: var(--accent); }
.contact__cvs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 18px; }
.contact__cvs a { display: flex; flex-direction: column; gap: 6px; padding: 18px 20px; border: 1px solid var(--line); border-radius: var(--radius-card); transition: border-color var(--dur-fast); }
.contact__cvs a:hover { border-color: var(--accent); }
.contact__cvLabel { font-weight: 500; }
.contact__meta { margin-top: 12px; }
@media (max-width: 860px) { .contact__cvs { grid-template-columns: 1fr; } }
</style>
