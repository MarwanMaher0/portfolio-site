<script setup lang="ts">
import { onMounted } from 'vue'
import site from '~~/content/site.json'
import { useLenis } from '~/composables/useLenis'

const { start, stop } = useLenis()
onMounted(() => { start() })
onBeforeUnmount(() => stop())

useHead({
  titleTemplate: (title?: string) => (title ? `${title} · ${site.person.shortName}` : site.seo.title),
  meta: [{ name: 'description', content: site.seo.description }],
})
</script>

<template>
  <div>
    <a class="skip-link" href="#main">Skip to content</a>
    <GateScene />
    <SiteNav :one-page="$route.path === '/'" />
    <main id="main">
      <NuxtPage />
    </main>
    <SiteFooter />
    <GrainOverlay />
    <CursorDot />
  </div>
</template>
