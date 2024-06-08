<template>
  <CommonMouseCursor />
  <CommonScrollToTop />
  <slot />
</template>

<script setup>
onMounted(() => {
  if (typeof WOW !== 'undefined') new WOW().init();
  if (typeof Splitting !== 'undefined') Splitting({ target: "[data-splitting]" });
});

useHead({
  link: [
    { rel: "stylesheet", href: "/assets/css/light.css" },
    { rel: "stylesheet", href: "/assets/css/globals.css" },
    { rel: "stylesheet", href: "/assets/css/mobile-app-light.css" }
  ],
});
</script>