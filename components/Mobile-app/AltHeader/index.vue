<template>
  <header class="page-app-header valign bg-img" data-overlay-dark="8"
    style="background-image:url('/mobile-app/img/p1.jpg')">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <h1>{{ headerData.title }}</h1>
            <div class="links">
              <NuxtLink to="#0">Home</NuxtLink>
              <span class="icon pe-7s-angle-right"></span>
              <NuxtLink to="#0">{{ headerData.page }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { headerData } = defineProps(['headerData']);
</script>
