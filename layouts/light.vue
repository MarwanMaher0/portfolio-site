<template>
  <div>
    <CommonMouseCursor />
    <CommonScrollToTop />
    <slot />
  </div>
</template>

<script setup>
onMounted(() => {
  if (typeof WOW !== 'undefined') new WOW().init();
});

useHead({
  link: [
    { rel: "stylesheet", href: "/assets/css/light.css" },
    { rel: "stylesheet", href: "/assets/css/globals.css" }
  ],
});
</script>
