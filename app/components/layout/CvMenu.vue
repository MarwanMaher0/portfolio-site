<script setup lang="ts">
import { ref } from 'vue'
import site from '~~/content/site.json'

const open = ref(false)
const close = () => { open.value = false }
</script>

<template>
  <div class="cv" @keydown.esc="close">
    <button
      class="cv__button" type="button" data-magnetic :aria-expanded="open" aria-haspopup="true"
      @click="open = !open"
    >
      <span data-magnetic-label>CV</span>
      <span class="cv__caret" aria-hidden="true">↓</span>
    </button>
    <transition name="cv-fade">
      <ul v-if="open" class="cv__list">
        <li v-for="item in site.cv" :key="item.file">
          <a class="cv__item" :href="item.file" download @click="close">
            <span class="cv__label">{{ item.label }}<span v-if="item.primary" class="cv__badge">Main</span></span>
            <span class="cv__hint">{{ item.hint }}</span>
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.cv { position: relative; }
.cv__button { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border: 1px solid var(--line); border-radius: var(--radius-pill); font-size: 13px; font-weight: 500; }
.cv__button:hover { border-color: var(--ink-3); }
.cv__caret { color: var(--ink-3); }
.cv__list { position: absolute; right: 0; top: calc(100% + 10px); width: 300px; padding: 8px; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-card); box-shadow: var(--shadow-float); }
.cv__item { display: block; padding: 12px 14px; border-radius: 12px; }
.cv__item:hover, .cv__item:focus-visible { background: var(--surface); }
.cv__label { display: flex; align-items: center; gap: 8px; font-weight: 500; font-size: 14px; }
.cv__badge { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--accent); }
.cv__hint { display: block; margin-top: 3px; font-size: 12.5px; color: var(--ink-3); }
.cv-fade-enter-active, .cv-fade-leave-active { transition: opacity var(--dur-fast), transform var(--dur-fast); }
.cv-fade-enter-from, .cv-fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
