<template>
  <section id="How" class="services box lficon section-padding position-re">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="sec-head text-center">
            <h6 class="wow fadeIn" data-wow-delay=".5s">How I work</h6>
            <h3 class="wow color-font">Four rules I hold myself to.</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="item in rules" :key="item.id" class="col-lg-6">
          <div class="item-box no-curve">
            <div>
              <span :class="`icon color-font ${item.icon}`"></span>
            </div>
            <div class="cont">
              <h6>{{ item.title }}</h6>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line bottom right"></div>
  </section>
</template>

<script setup>
import rules from '@/data/how-i-work.json';
</script>
