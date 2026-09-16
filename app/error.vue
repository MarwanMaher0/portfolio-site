<script setup lang="ts">
defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
</script>

<template>
  <div class="error">
    <svg class="error__gate" viewBox="0 0 200 260" aria-hidden="true">
      <rect x="10" y="10" width="180" height="240" rx="42" fill="none" stroke="var(--phase-learn)" stroke-width="10" opacity="0.7" />
      <circle cx="176" cy="240" r="9" fill="var(--accent-2)" />
    </svg>
    <h1 class="error__title">This gate leads nowhere.</h1>
    <p class="error__text">{{ error.statusCode }} — {{ error.statusMessage || 'Page not found' }}</p>
    <NuxtLink class="btn btn--primary" to="/">Back to the start</NuxtLink>
  </div>
</template>

<style scoped>
.error { min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center; padding: var(--gutter); background: var(--bg); }
.error__gate { width: 160px; height: auto; }
.error__title { font-size: var(--text-h2); }
.error__text { color: var(--ink-3); font-family: var(--font-mono); font-size: var(--text-mono); letter-spacing: var(--tracking-mono); text-transform: uppercase; }
</style>
