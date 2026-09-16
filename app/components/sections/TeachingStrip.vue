<script setup lang="ts">
import projects from '~~/content/projects.json'
const teaching = projects.teaching
</script>

<template>
  <article class="teaching card container">
    <div class="teaching__shot frame">
      <AppImage :src="teaching.images[0].src" :alt="teaching.images[0].alt" sizes="(max-width: 900px) 92vw, 40vw" />
    </div>
    <div class="teaching__text">
      <p class="kicker">Teaching</p>
      <h3 class="teaching__title">{{ teaching.title }}</h3>
      <p class="teaching__subtitle">{{ teaching.subtitle }} · {{ teaching.dates }}</p>
      <p class="measure">{{ teaching.summary }}</p>
      <p class="teaching__links">
        <a v-for="link in teaching.links" :key="link.href" :href="link.href" target="_blank" rel="noopener" data-cursor="Open">{{ link.label }} →</a>
      </p>
    </div>
  </article>
</template>

<style scoped>
.teaching { display: grid; grid-template-columns: 5fr 7fr; gap: clamp(20px, 3vw, 44px); align-items: center; padding: clamp(20px, 2.6vw, 36px); }
.teaching__text { display: flex; flex-direction: column; gap: 12px; }
.teaching__title { font-size: var(--text-h3); }
.teaching__subtitle { color: var(--ink-3); font-family: var(--font-mono); font-size: var(--text-mono); letter-spacing: var(--tracking-mono); text-transform: uppercase; }
.teaching__links { color: var(--accent); font-weight: 500; }
@media (max-width: 900px) { .teaching { grid-template-columns: 1fr; } }
</style>
