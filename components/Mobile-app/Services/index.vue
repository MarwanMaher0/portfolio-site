<template>
  <section class="serv-block section-padding">
    <div class="container">
      <SectionLeft :theme="theme" />
      <SectionRight :theme="theme" />
    </div>
    <div class="circle-blur"></div>
    <div class="circle-blur two"></div>
  </section>
</template>

<script setup>
import SectionLeft from './section-left';
import SectionRight from './section-right';

const { theme } = defineProps(['theme']);
</script>
