<script setup lang="ts">
defineProps<{
  tool: {
    slug: string; name: string; tagline: string; description: string; chapter: string
    stack: string[]; tests: string; links: { label: string; href: string }[]
    image: { src: string; alt: string }
  }
  guards?: string[]
}>()
</script>

<template>
  <article class="feature card container">
    <div class="feature__text">
      <p class="kicker">Open source · {{ tool.chapter }}</p>
      <h3 class="feature__name">{{ tool.name }}</h3>
      <p class="feature__tagline">{{ tool.tagline }}</p>
      <p class="measure">{{ tool.description }}</p>
      <ul v-if="guards" class="feature__guards">
        <li v-for="guard in guards" :key="guard" class="chip feature__guard">{{ guard }}</li>
      </ul>
      <ul class="feature__chips">
        <li class="chip chip--accent">{{ tool.tests }}</li>
        <li v-for="item in tool.stack" :key="item" class="chip">{{ item }}</li>
      </ul>
      <p class="feature__links">
        <a v-for="link in tool.links" :key="link.href" :href="link.href" target="_blank" rel="noopener" data-cursor="Open">{{ link.label }} →</a>
      </p>
    </div>
    <div class="feature__shot frame">
      <AppImage :src="tool.image.src" :alt="tool.image.alt" sizes="(max-width: 900px) 92vw, 46vw" />
    </div>
  </article>
</template>

<style scoped>
.feature { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px, 3vw, 48px); align-items: center; padding: clamp(24px, 3vw, 44px); }
.feature__text { display: flex; flex-direction: column; gap: 14px; }
.feature__name { font-size: var(--text-h2); }
.feature__tagline { font-weight: 500; }
.feature__chips, .feature__guards { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
.feature__guard { transition: border-color var(--dur-fast), color var(--dur-fast); }
.feature__guard:hover { border-color: var(--accent-2); color: var(--accent-2); }
.feature__links { display: flex; gap: 20px; margin-top: 6px; color: var(--accent); font-weight: 500; }
.feature__shot { background: var(--surface); }
@media (max-width: 900px) { .feature { grid-template-columns: 1fr; } }
</style>
