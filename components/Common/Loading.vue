<template>
  <div class="showX">
    <div class="loading">
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
    </div>
    <div id="preloader"></div>
  </div>
</template>

<script setup>
import loadingPace from "@/common/loadingPace";

onMounted(() => {
  if (typeof Pace !== 'undefined') loadingPace();
});
</script>
