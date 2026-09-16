<script setup lang="ts">
import { computed } from 'vue'
import { image } from '~/utils/images'

const props = defineProps<{ src: string; alt: string; sizes?: string; eager?: boolean; priority?: boolean }>()
const data = computed(() => image(props.src))
</script>

<template>
  <img
    :src="data.src" :srcset="data.srcset" :sizes="sizes ?? '(max-width: 1024px) 92vw, 60vw'"
    :width="data.width" :height="data.height" :alt="alt"
    :loading="eager ? 'eager' : 'lazy'" :fetchpriority="priority ? 'high' : undefined" decoding="async"
  >
</template>
