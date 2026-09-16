<script setup lang="ts">
import oss from '~~/content/open-source.json'
</script>

<template>
  <div class="oss container">
    <ul class="oss__grid">
      <li v-for="tool in oss.tools" :key="tool.slug" class="oss__card card" :class="`oss__card--${tool.chapter}`">
        <a class="oss__link" :href="tool.links[tool.links.length - 1].href" target="_blank" rel="noopener" data-cursor="Open">
          <!-- The screenshot stays out of the way until the pointer asks for it. -->
          <span class="oss__shot" aria-hidden="true">
            <AppImage :src="tool.image.src" :alt="''" sizes="(max-width: 900px) 92vw, 30vw" />
          </span>
          <span class="oss__body">
            <span class="mono oss__chapter">{{ tool.chapter }}</span>
            <span class="oss__name">{{ tool.name }}</span>
            <span class="oss__tagline">{{ tool.tagline }}</span>
            <span class="oss__chips">
              <span class="chip chip--accent">{{ tool.tests }}</span>
              <span v-for="item in tool.stack.slice(0, 2)" :key="item" class="chip">{{ item }}</span>
            </span>
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
.oss__card { position: relative; overflow: hidden; border-top: 3px solid var(--line); transition: transform var(--dur-base) var(--ease-out), border-color var(--dur-base); }
.oss__card--decide { border-top-color: var(--phase-decide); }
.oss__card--ship { border-top-color: var(--phase-ship); }
.oss__card--learn { border-top-color: var(--phase-learn); }
.oss__card--rtl { border-top-color: var(--ink-2); }
.oss__card:hover, .oss__card:focus-within { transform: translateY(-4px); }

.oss__link { position: relative; display: block; min-height: 236px; padding: clamp(18px, 2vw, 24px); height: 100%; }
.oss__body { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 8px; height: 100%; }
.oss__chapter { color: var(--ink-3); }
.oss__name { font-family: var(--font-display); font-size: var(--text-h3); }
.oss__tagline { color: var(--ink-2); font-size: 15px; }
.oss__chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 14px; }

.oss__shot { position: absolute; inset: 0; z-index: 1; opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.oss__shot :deep(img) { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.oss__shot::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgb(7 16 13 / 0.82) 0%, rgb(7 16 13 / 0.88) 55%, rgb(7 16 13 / 0.95) 100%); }
@media (hover: hover) and (pointer: fine) {
  .oss__card:hover .oss__shot, .oss__card:focus-within .oss__shot { opacity: 1; }
}

.oss__also { margin-top: 28px; color: var(--ink-2); display: flex; flex-wrap: wrap; gap: 8px 18px; }
.oss__also a { color: var(--accent); }
.oss__profile { margin-left: auto; }
@media (max-width: 1100px) { .oss__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 720px) { .oss__grid { grid-template-columns: 1fr; } .oss__link { min-height: 0; } }
@media (prefers-reduced-motion: reduce) { .oss__card:hover { transform: none; } }
</style>
