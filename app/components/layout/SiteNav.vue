<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import site from '~~/content/site.json'
import { useLenis } from '~/composables/useLenis'
import { canAnimate } from '~/composables/useMotion'

const props = defineProps<{ onePage?: boolean }>()
const hidden = ref(false)
const solid = ref(false)
const menuOpen = ref(false)
const progress = ref([0, 0, 0])
const { scrollTo } = useLenis()
let onScroll: (() => void) | null = null

/** Fills one progress segment per chapter, from each chapter's own scroll span. */
function updateProgress() {
  const ids = ['decide', 'ship', 'learn']
  progress.value = ids.map((id) => {
    const el = document.getElementById(id)
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    const total = rect.height + window.innerHeight
    const seen = window.innerHeight - rect.top
    return Math.max(0, Math.min(1, seen / total))
  })
}

onMounted(() => {
  let last = window.scrollY
  onScroll = () => {
    const y = window.scrollY
    solid.value = y > window.innerHeight * 0.6
    hidden.value = canAnimate() && y > last && y > window.innerHeight && !menuOpen.value
    last = y
    if (props.onePage) updateProgress()
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => { if (onScroll) window.removeEventListener('scroll', onScroll) })

function go(href: string) {
  menuOpen.value = false
  if (!props.onePage) { navigateTo(`/${href}`); return }
  scrollTo(href)
}
</script>

<template>
  <header class="nav" :class="{ 'nav--hidden': hidden, 'nav--solid': solid }">
    <div class="nav__inner container">
      <NuxtLink class="nav__brand" to="/" data-cursor="Home">
        <img src="/brand/favicon.svg" alt="" width="26" height="26">
        <span>{{ site.person.shortName }}</span>
      </NuxtLink>

      <nav class="nav__links hide-sm" aria-label="Sections">
        <a
          v-for="item in site.nav" :key="item.href" :href="props.onePage ? item.href : `/${item.href}`"
          class="nav__link" :class="item.phase ? `nav__link--${item.phase}` : ''"
          @click.prevent="go(item.href)"
        >{{ item.label }}</a>
        <CvMenu />
      </nav>

      <button class="nav__menu hide-lg" type="button" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
        {{ menuOpen ? 'Close' : 'Menu' }}
      </button>
    </div>

    <div v-if="props.onePage" class="nav__progress" aria-hidden="true">
      <span v-for="(value, index) in progress" :key="index" class="nav__segment">
        <span class="nav__fill" :class="`nav__fill--${index}`" :style="{ transform: `scaleX(${value})` }" />
      </span>
    </div>

    <transition name="menu">
      <div v-if="menuOpen" class="menu hide-lg">
        <a
          v-for="item in site.nav" :key="item.href" class="menu__link" :href="props.onePage ? item.href : `/${item.href}`"
          @click.prevent="go(item.href)"
        >{{ item.label }}</a>
        <div class="menu__cv">
          <a v-for="item in site.cv" :key="item.file" class="menu__cvlink" :href="item.file" download>
            {{ item.label }} <span>CV</span>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: var(--z-nav); transition: transform var(--dur-base) var(--ease-out), background var(--dur-base); }
.nav--hidden { transform: translateY(-110%); }
.nav--solid { background: rgb(7 16 13 / 0.72); backdrop-filter: blur(10px); }
.nav__inner { display: flex; align-items: center; justify-content: space-between; height: 72px; }
.nav__brand { display: flex; align-items: center; gap: 12px; font-weight: 500; font-size: 15px; }
.nav__brand img { border-radius: 7px; }
.nav__links { display: flex; align-items: center; gap: 32px; font-size: 14px; font-weight: 500; color: var(--ink-2); }
.nav__link:hover { color: var(--ink); }
.nav__link--decide:hover { color: var(--phase-decide); }
.nav__link--learn:hover { color: var(--phase-learn); }
.nav__menu { font-family: var(--font-mono); font-size: 12px; letter-spacing: var(--tracking-mono); text-transform: uppercase; padding: 9px 14px; border: 1px solid var(--line); border-radius: var(--radius-pill); }
.nav__progress { display: flex; gap: 6px; padding-inline: var(--gutter); }
.nav__segment { flex: 1; height: 2px; background: var(--line); overflow: hidden; }
.nav__fill { display: block; height: 100%; transform-origin: left; transform: scaleX(0); background: var(--phase-decide); transition: transform 120ms linear; }
.nav__fill--1 { background: var(--phase-ship); }
.nav__fill--2 { background: var(--phase-learn); }
.menu { position: fixed; inset: 72px 0 0; background: var(--bg); padding: 40px var(--gutter); display: flex; flex-direction: column; gap: 22px; }
.menu__link { font-family: var(--font-display); font-size: 2.2rem; }
.menu__cv { margin-top: auto; display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--line); padding-top: 22px; }
.menu__cvlink { display: flex; justify-content: space-between; font-size: 15px; color: var(--ink-2); }
.menu__cvlink span { font-family: var(--font-mono); font-size: 11px; letter-spacing: var(--tracking-mono); color: var(--accent); }
.menu-enter-active, .menu-leave-active { transition: opacity var(--dur-base); }
.menu-enter-from, .menu-leave-to { opacity: 0; }
</style>
