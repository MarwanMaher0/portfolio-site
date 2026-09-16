<script setup lang="ts">
defineProps<{ steps: string[] }>()
</script>

<template>
  <div class="typo">
    <svg class="typo__frame" viewBox="0 0 340 450" aria-hidden="true">
      <rect x="14" y="14" width="312" height="422" rx="56" fill="none" stroke="var(--phase-decide)" stroke-width="10" opacity="0.5" />
      <g stroke="var(--line)" fill="none" stroke-width="1">
        <path d="M-60 380 Q170 320 400 380" /><path d="M-60 410 Q170 350 400 410" /><path d="M-60 440 Q170 380 400 440" />
      </g>
    </svg>
    <ol class="typo__steps">
      <li v-for="(step, index) in steps" :key="step" class="typo__step">
        <span v-if="index" class="typo__arrow" aria-hidden="true">→</span>{{ step }}
      </li>
    </ol>
  </div>
</template>

<style scoped>
.typo { position: relative; display: grid; place-items: center; aspect-ratio: 16 / 11; }
.typo__frame { position: absolute; height: 84%; width: auto; opacity: 0.85; }
.typo__steps { position: relative; display: flex; flex-direction: column; gap: 14px; text-align: center; font-family: var(--font-mono); font-size: clamp(12px, 1.1vw, 15px); letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--ink-2); }
.typo__arrow { color: var(--accent); margin-right: 10px; }
</style>
