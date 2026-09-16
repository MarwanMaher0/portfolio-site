<script setup lang="ts">
import site from '~~/content/site.json'
import { useLenis } from '~/composables/useLenis'
const { scrollTo } = useLenis()
</script>

<template>
  <footer class="footer surface">
    <div class="container footer__inner">
      <p class="mono">{{ site.footer.note }}</p>
      <div class="footer__right">
        <span class="mono">{{ site.footer.copyright }}</span>
        <button class="mono footer__top" type="button" @click="scrollTo('#top')">Back to top ↑</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { border-top: 1px solid var(--line); padding-block: 40px; }
.footer__inner { display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: center; }
.footer__right { display: flex; gap: 24px; align-items: center; }
.footer__top:hover { color: var(--accent); }
</style>
