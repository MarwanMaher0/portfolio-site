<template>
  <div>
    <div class="mouse-cursor cursor-outer"></div>
    <div class="mouse-cursor cursor-inner"></div>
  </div>
</template>

<script setup>
import mouseEffect from "@/common/cursorEffect";

onMounted(() => {
  mouseEffect();
});
</script>
