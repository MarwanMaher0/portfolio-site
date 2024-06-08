<template>
  <section class="app-services section-padding bg-gray">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-10">
          <div class="s-head text-center mb-80">
            <h6 class="stit mb-30"><span class="left"></span> Application Features <span class="Right"></span></h6>
            <h2>Amazing Features to Customize your Application Easy</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6" v-for="feature, index in features" :key="feature.id">
          <div :class="`item ${index !== features.length - 1 ? 'mb-30' : ''}`">
            <div class="item-tit mb-15">
              <div class="icon">
                <span :class="feature.icon"></span>
              </div>
              <div class="text-tit">
                <h5>{{ feature.title }}</h5>
              </div>
            </div>
            <p>{{ feature.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import features from '@/data/mobile-app/features.json';
</script>
