<template>
  <section class="brands pt-80 pb-80 bg-dark" data-overlay-dark="0">
    <div class="container">
      <div class="head mb-60 text-center">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-9">
            <div class="text">
              <h2>We’ve <span>154+ <img :src="brands.image" alt="" class="bord-gr"></span> Global Partners</h2>
              <span class="mt-10">Professional Design Agency to provide solutions</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <template v-for="brand, index in brands.brands">
          <div :class="`col-lg ${index !== 4 ? 'col-sm-3' : 'lg-hide'}`" :key="brand.id" v-if="index < 5">
            <div class="item">
              <div class="img">
                <NuxtLink to="#0">
                  <img :src="brand.image" alt="" class="front">
                  <img :src="brand.image" alt="" class="back">
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="row lg-hide">
        <template v-for="brand, index in brands.brands">
          <div class="col-lg" :key="brand.id" v-if="index >= 5">
            <div class="item">
              <div class="img">
                <NuxtLink to="#0">
                  <img :src="brand.image" alt="" class="front">
                  <img :src="brand.image" alt="" class="back">
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="circle-blur"></div>
  </section>
</template>

<script setup>
import brands from '@/data/mobile-app/brands.json';
</script>
