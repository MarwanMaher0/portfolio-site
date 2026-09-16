<script setup lang="ts">
import oss from '~~/content/open-source.json'
</script>

<template>
  <div class="oss container">
    <ul class="oss__grid">
      <li v-for="tool in oss.tools" :key="tool.slug" class="oss__card card" :class="`oss__card--${tool.chapter}`">
        <a class="oss__link" :href="tool.links[tool.links.length - 1].href" target="_blank" rel="noopener" data-cursor="Open">
          <span class="mono oss__chapter">{{ tool.chapter }}</span>
          <h3 class="oss__name">{{ tool.name }}</h3>
          <p class="oss__tagline">{{ tool.tagline }}</p>
          <p class="oss__description">{{ tool.description }}</p>
          <span class="oss__chips">
            <span class="chip chip--accent">{{ tool.tests }}</span>
            <span v-for="item in tool.stack" :key="item" class="chip">{{ item }}</span>
          </span>
          <span class="oss__shot">
            <AppImage :src="tool.image.src" :alt="tool.image.alt" sizes="(max-width: 900px) 92vw, 30vw" />
          </span>
        </a>
      </li>
    </ul>
    <p class="oss__also">
      Also: <a :href="oss.also.href" target="_blank" rel="noopener">{{ oss.also.name }}</a> — {{ oss.also.description }}
      <a class="oss__profile" :href="oss.githubProfile" target="_blank" rel="noopener">All repositories →</a>
    </p>
  </div>
</template>

<style scoped>
.oss__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(14px, 2vw, 24px); }
.oss__card { position: relative; overflow: hidden; transition: transform var(--dur-base) var(--ease-out), border-color var(--dur-base); border-top: 3px solid var(--line); }
.oss__card--decide { border-top-color: var(--phase-decide); }
.oss__card--ship { border-top-color: var(--phase-ship); }
.oss__card--learn { border-top-color: var(--phase-learn); }
.oss__card--rtl { border-top-color: var(--ink-2); }
.oss__card:hover { transform: translateY(-6px); }
.oss__link { display: flex; flex-direction: column; gap: 10px; padding: clamp(20px, 2.2vw, 28px); height: 100%; }
.oss__chapter { color: var(--ink-3); }
.oss__name { font-size: var(--text-h3); }
.oss__tagline { font-weight: 500; }
.oss__description { color: var(--ink-2); font-size: 15px; }
.oss__chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 12px; }
.oss__shot { display: block; margin: 14px -28px -28px; border-top: 1px solid var(--line); transform: translateY(14%); opacity: 0.55; transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-base); }
.oss__card:hover .oss__shot { transform: translateY(0); opacity: 1; }
.oss__also { margin-top: 28px; color: var(--ink-2); display: flex; flex-wrap: wrap; gap: 8px 18px; }
.oss__also a { color: var(--accent); }
.oss__profile { margin-left: auto; }
@media (max-width: 1100px) { .oss__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 720px) { .oss__grid { grid-template-columns: 1fr; } }
</style>
