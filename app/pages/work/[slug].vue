<script setup lang="ts">
import { computed, ref } from 'vue'
import projects from '~~/content/projects.json'
import site from '~~/content/site.json'
import { useMagnetic } from '~/composables/useMagnetic'
import { useReveal } from '~/composables/useReveal'

const route = useRoute()
const all = [...projects.featured, ...projects.more]
const index = all.findIndex((item) => item.slug === route.params.slug)
if (index === -1) throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })

const project = all[index]!
const next = all[(index + 1) % all.length]!
const galleries = computed(() => ('galleries' in project && project.galleries?.length)
  ? project.galleries as { label: string; images: { src: string; alt: string }[] }[]
  : [{ label: 'Gallery', images: (project.images ?? []) as { src: string; alt: string }[] }])
const activeTab = ref(0)
const lightbox = ref<number | null>(null)
const currentImages = computed(() => galleries.value[activeTab.value]?.images ?? [])

const openLightbox = (i: number) => { lightbox.value = i }
const closeLightbox = () => { lightbox.value = null }
const step = (delta: number) => {
  if (lightbox.value === null) return
  const total = currentImages.value.length
  lightbox.value = (lightbox.value + delta + total) % total
}

useMagnetic()
useReveal(() => document.querySelector('main') as HTMLElement)

useHead({
  title: `${project.title} — ${project.subtitle}`,
  meta: [
    { name: 'description', content: project.summary },
    { property: 'og:title', content: `${project.title} · ${site.person.shortName}` },
    { property: 'og:description', content: project.summary },
    { property: 'og:image', content: `${site.person.siteUrl}${project.images?.[0]?.src ?? site.seo.ogImage}` },
  ],
  link: [{ rel: 'canonical', href: `${site.person.siteUrl}/work/${project.slug}` }],
})
</script>

<template>
  <article class="case">
    <header class="case__hero container">
      <p class="mono case__crumb"><NuxtLink to="/">Work</NuxtLink> / {{ project.title }}</p>
      <h1 class="case__title">{{ project.title }}</h1>
      <p class="case__subtitle lead">{{ project.subtitle }}</p>
      <dl class="case__meta">
        <div><dt class="mono">Organisation</dt><dd>{{ project.org }}</dd></div>
        <div><dt class="mono">Role</dt><dd>{{ project.role }}</dd></div>
        <div><dt class="mono">Dates</dt><dd>{{ project.dates }}</dd></div>
        <div v-if="'access' in project && project.access"><dt class="mono">Access</dt><dd>{{ project.access }}</dd></div>
      </dl>

      <div v-if="project.images?.length" class="case__cover frame">
        <AppImage :src="project.images[0].src" :alt="project.images[0].alt" sizes="(max-width: 1024px) 92vw, 1200px" eager />
      </div>
      <TypographicPanel v-else class="case__cover" :steps="['4 vendors evaluated', '1 build-vs-buy call', 'in production']" />
    </header>

    <div class="case__body container">
      <section v-if="project.problem" class="case__block">
        <h2 class="mono case__label">Problem</h2>
        <p class="case__text" data-reveal>{{ project.problem }}</p>
      </section>

      <section class="case__block">
        <h2 class="mono case__label">What I did</h2>
        <ol class="case__did">
          <li v-for="(item, i) in project.did" :key="i" data-reveal>
            <span class="mono case__didNum">{{ String(i + 1).padStart(2, '0') }}</span>{{ item }}
          </li>
        </ol>
      </section>

      <section v-if="'outcome' in project && project.outcome" class="case__block">
        <h2 class="mono case__label">Outcome</h2>
        <p class="case__text">{{ project.outcome }}</p>
        <ul v-if="project.metrics?.length" class="case__metrics">
          <li v-for="metric in project.metrics" :key="metric.label">
            <span class="case__metricValue num">{{ metric.value }}</span>
            <span class="mono">{{ metric.label }}</span>
          </li>
        </ul>
      </section>

      <section class="case__block">
        <h2 class="mono case__label">Stack</h2>
        <ul class="case__stack">
          <li v-for="item in project.stack" :key="item" class="chip">{{ item }}</li>
        </ul>
        <p v-if="project.links?.length" class="case__links">
          <a v-for="link in project.links" :key="link.href" :href="link.href" target="_blank" rel="noopener" data-cursor="Open">{{ link.label }} →</a>
        </p>
        <p v-if="'note' in project && project.note" class="mono case__note">{{ project.note }}</p>
      </section>
    </div>

    <section v-if="currentImages.length" class="case__gallery container">
      <div v-if="galleries.length > 1" class="case__tabs" role="tablist">
        <button
          v-for="(gallery, i) in galleries" :key="gallery.label" class="case__tab" :class="{ 'is-active': activeTab === i }"
          type="button" role="tab" :aria-selected="activeTab === i" @click="activeTab = i; lightbox = null"
        >{{ gallery.label }}</button>
      </div>
      <ul class="case__shots">
        <li v-for="(img, i) in currentImages" :key="img.src" class="frame case__shot">
          <button type="button" class="case__shotButton" data-cursor="View" @click="openLightbox(i)">
            <AppImage :src="img.src" :alt="img.alt" sizes="(max-width: 900px) 92vw, 46vw" />
          </button>
        </li>
      </ul>
    </section>

    <NuxtLink class="case__next" :to="`/work/${next.slug}`" data-cursor="Open">
      <span class="container case__nextInner">
        <span class="mono">Next project</span>
        <span class="case__nextTitle">{{ next.title }} →</span>
      </span>
    </NuxtLink>

    <dialog v-if="lightbox !== null" class="lightbox" open @keydown.esc="closeLightbox" @keydown.left="step(-1)" @keydown.right="step(1)">
      <button class="lightbox__close" type="button" autofocus @click="closeLightbox">Close ✕</button>
      <figure class="lightbox__figure">
        <AppImage :src="currentImages[lightbox].src" :alt="currentImages[lightbox].alt" sizes="92vw" />
        <figcaption>
          <span class="mono">{{ lightbox + 1 }} / {{ currentImages.length }}</span>
          {{ currentImages[lightbox].alt }}
        </figcaption>
      </figure>
      <button class="lightbox__nav lightbox__nav--prev" type="button" @click="step(-1)">←</button>
      <button class="lightbox__nav lightbox__nav--next" type="button" @click="step(1)">→</button>
    </dialog>
  </article>
</template>

<style scoped>
.case { position: relative; z-index: 1; background: var(--bg); padding-top: 120px; }
.case__hero { display: flex; flex-direction: column; gap: 16px; }
.case__crumb a:hover { color: var(--accent); }
.case__title { font-size: var(--text-chapter); }
.case__meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 18px; margin: 18px 0 32px; }
.case__meta dt { margin-bottom: 6px; }
.case__meta dd { margin: 0; color: var(--ink-2); }
.case__cover { max-width: 1200px; }
.case__body { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(28px, 4vw, 56px); padding-block: clamp(48px, 7vw, 96px); }
.case__block { display: flex; flex-direction: column; gap: 14px; }
.case__label { color: var(--accent); }
.case__text { color: var(--ink-2); max-width: var(--measure); }
.case__did { display: flex; flex-direction: column; gap: 14px; color: var(--ink-2); }
.case__did li { display: grid; grid-template-columns: 42px 1fr; }
.case__didNum { color: var(--ink-3); }
.case__metrics { display: flex; flex-wrap: wrap; gap: 24px; margin-top: 8px; }
.case__metrics li { display: flex; flex-direction: column; gap: 4px; max-width: 160px; }
.case__metricValue { font-family: var(--font-display); font-size: 2rem; line-height: 1; }
.case__stack { display: flex; flex-wrap: wrap; gap: 8px; }
.case__links { display: flex; gap: 18px; color: var(--accent); font-weight: 500; }
.case__note { text-transform: none; }
.case__gallery { padding-bottom: clamp(48px, 7vw, 96px); }
.case__tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
.case__tab { padding: 8px 16px; border: 1px solid var(--line); border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: 11px; letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--ink-2); }
.case__tab.is-active { border-color: var(--accent); color: var(--accent); }
.case__shots { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(12px, 2vw, 20px); }
.case__shotButton { display: block; width: 100%; }
.case__next { display: block; padding-block: clamp(40px, 6vw, 80px); border-top: 1px solid var(--line); background: var(--surface); }
.case__nextInner { display: flex; flex-direction: column; gap: 10px; }
.case__nextTitle { font-family: var(--font-display); font-size: var(--text-h2); }
.case__next:hover .case__nextTitle { color: var(--accent); }
.lightbox { position: fixed; inset: 0; width: 100%; height: 100%; max-width: none; max-height: none; border: 0; background: rgb(4 9 10 / 0.94); z-index: var(--z-overlay); display: grid; place-items: center; padding: 5vh 6vw; }
.lightbox__figure { margin: 0; display: flex; flex-direction: column; gap: 14px; max-width: min(1200px, 92vw); }
.lightbox__figure figcaption { display: flex; gap: 14px; color: var(--ink-2); font-size: 14px; }
.lightbox__close { position: absolute; top: 24px; right: 28px; font-family: var(--font-mono); font-size: 12px; letter-spacing: var(--tracking-mono); text-transform: uppercase; }
.lightbox__nav { position: absolute; top: 50%; font-size: 26px; color: var(--ink-2); padding: 12px 18px; }
.lightbox__nav--prev { left: 12px; } .lightbox__nav--next { right: 12px; }
@media (max-width: 900px) { .case__body, .case__shots { grid-template-columns: 1fr; } }
</style>
