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
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'en' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: site.seo.title },
    { name: 'twitter:description', content: site.seo.description },
    { name: 'twitter:image', content: `${site.person.siteUrl}${site.seo.ogImage}` },
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
      telephone: site.person.phone,
      image: `${site.person.siteUrl}${site.person.photo.src}`,
      description: `${site.hero.sub} ${site.person.availability}.`,
      worksFor: { '@type': 'Organization', name: 'SIPRC (Saudi Intellectual Property Rights Company)', url: 'https://www.siprc.sa' },
      knowsLanguage: ['Arabic', 'English'],
      knowsAbout: [
        'Project management', 'Requirements engineering', 'Vendor evaluation', 'Django', 'Python',
        'Vue.js', 'Nuxt', 'TypeScript', 'PostgreSQL', 'Docker', 'Selenium', 'Playwright',
        'Arabic/English right-to-left interfaces', 'Intellectual property operations',
      ],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Assiut University' },
      address: { '@type': 'PostalAddress', addressCountry: 'EG' },
      homeLocation: { '@type': 'Place', name: 'Egypt' },
      workLocation: [
        { '@type': 'Place', name: 'Remote' },
        { '@type': 'Place', name: 'Saudi Arabia' },
        { '@type': 'Place', name: 'United Arab Emirates' },
      ],
      seeks: { '@type': 'Demand', name: 'Technical Project Manager and engineering roles, remote or in Saudi Arabia and the UAE' },
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
