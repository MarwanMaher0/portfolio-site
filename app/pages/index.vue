<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import site from '~~/content/site.json'
import oss from '~~/content/open-source.json'
import { canAnimate, loadGsap } from '~/composables/useMotion'
import { useScene } from '~/composables/useScene'
import { useMagnetic } from '~/composables/useMagnetic'
import { useHeadingReveal, useReveal } from '~/composables/useReveal'

const chapters = site.chapters
const bands: Record<string, [number, number]> = { decide: [0.02, 0.36], ship: [0.36, 0.58], learn: [0.58, 0.82] }
const decisionMatrix = oss.tools.find((tool) => tool.slug === 'decision-matrix')!
const phasegate = oss.tools.find((tool) => tool.slug === 'phasegate')!
const postmortem = oss.tools.find((tool) => tool.slug === 'django-postmortem')!
const guards = ['regression test', 'database constraint', 'schema check', 'alert', 'runbook', 'process change']

const { opacity } = useScene()
let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null

useMagnetic()
useReveal(() => document.querySelector('main') as HTMLElement)
useHeadingReveal(() => document.querySelector('main') as HTMLElement)

onMounted(async () => {
  if (!canAnimate()) return
  const { gsap, ScrollTrigger } = await loadGsap()
  ctx = gsap.context(() => {
    // Text always sits on a solid surface: dim the 3D behind reading sections.
    gsap.utils.toArray<HTMLElement>('[data-dim]').forEach((section) => {
      ScrollTrigger.create({
        trigger: section, start: 'top 80%', end: 'bottom 20%',
        onToggle: ({ isActive }) => { if (isActive) opacity(0.12) },
      })
    })
  })
})
onBeforeUnmount(() => ctx?.revert())

useHead({
  title: undefined,
  link: [{ rel: 'canonical', href: site.person.siteUrl }],
  meta: [
    { property: 'og:title', content: site.seo.title },
    { property: 'og:description', content: site.seo.description },
    { property: 'og:image', content: `${site.person.siteUrl}${site.seo.ogImage}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: site.person.siteUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.person.name,
      jobTitle: site.person.role,
      url: site.person.siteUrl,
      email: `mailto:${site.person.email}`,
      sameAs: [site.person.linkedin, site.person.github],
      knowsLanguage: ['Arabic', 'English'],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Assiut University' },
      address: { '@type': 'PostalAddress', addressCountry: 'EG' },
    }),
  }],
})
</script>

<template>
  <div>
    <HeroSection />

    <LazyChapterGate :chapter="chapters[0]" :band="bands.decide" :hydrate-on-visible="{ rootMargin: '1200px' }" />
    <section class="section surface" data-dim>
      <div class="container section__head">
        <h2 class="h2" data-split>Deciding is the work.</h2>
        <p class="lead" data-reveal>Three moments where the decision mattered more than the code.</p>
      </div>
      <LazyDecideStories :hydrate-on-visible="{ rootMargin: '1000px' }" />
      <div class="section__gap" />
      <LazyDecisionToy :hydrate-on-visible="{ rootMargin: '1000px' }" />
      <div class="section__gap" />
      <LazyOssFeature :tool="decisionMatrix" :hydrate-on-visible="{ rootMargin: '1000px' }" />
    </section>

    <LazyChapterGate :chapter="chapters[1]" :band="bands.ship" :hydrate-on-visible="{ rootMargin: '1200px' }" />
    <section class="section surface" data-dim>
      <LazyPhaseStrip :tool="phasegate" :hydrate-on-visible="{ rootMargin: '1000px' }" />
      <LazyFeaturedTrack :hydrate-on-visible="{ rootMargin: '1600px' }" />
      <div class="container section__head section__head--spaced">
        <h2 class="h2" data-split>More work.</h2>
        <p class="lead" data-reveal>Freelance engagements, a side project and earlier client work.</p>
      </div>
      <LazyMoreWorkList :hydrate-on-visible="{ rootMargin: '1000px' }" />
      <div class="section__gap" />
      <LazyTeachingStrip :hydrate-on-visible="{ rootMargin: '800px' }" />
    </section>

    <LazyRtlLab :hydrate-on-visible="{ rootMargin: '1200px' }" />

    <LazyChapterGate :chapter="chapters[2]" :band="bands.learn" :hydrate-on-visible="{ rootMargin: '1200px' }" />
    <section class="section surface" data-dim>
      <LazyPrinciplesList :hydrate-on-visible="{ rootMargin: '1000px' }" />
      <div class="section__gap" />
      <LazyOssFeature :tool="postmortem" :guards="guards" :hydrate-on-visible="{ rootMargin: '1000px' }" />
      <div class="section__gap" />
      <div class="container section__head">
        <h2 class="h2" data-split>Tools I keep in the open.</h2>
        <p class="lead" data-reveal>Six MIT-licensed tools, each with its tests running in CI.</p>
      </div>
      <LazyOssGrid :hydrate-on-visible="{ rootMargin: '1000px' }" />
    </section>

    <LazyPathTimeline :hydrate-on-visible="{ rootMargin: '1000px' }" />
    <LazyContactSection :hydrate-on-visible="{ rootMargin: '1000px' }" />
  </div>
</template>

<style scoped>
.section__head { display: flex; flex-direction: column; gap: 14px; margin-bottom: clamp(32px, 5vw, 64px); }
.section__head--spaced { margin-top: clamp(56px, 8vw, 120px); }
.section__gap { height: clamp(56px, 8vw, 120px); }
</style>
