<template>
  <section class="case-study">
    <div id="content-carousel-container-unq-1" class="swiper-container" data-swiper="container">
      <Swiper v-bind="swiperOptions" class="swiper-wrapper">
        <SwiperSlide v-for="slide in caseStudyData" :key="slide.id" class="swiper-slide bg-img"
          :style="`background-image: url(${slide.image}) `" data-overlay-dark="7">
          <div class="container d-flex align-items-end">
            <div class="cont">
              <NuxtLink to="#">
                <span>Case Study</span>
                <h6 class="main-color">{{ slide.date }}</h6>
                <h4>{{ slide.title }}</h4>
              </NuxtLink>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="controls">
        <div class="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer">
          <i class="fas fa-chevron-right"></i>
        </div>
        <div class="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer">
          <i class="fas fa-chevron-left"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, EffectFade } from 'swiper';
import removeSlashFromBagination from "@/common/removeSlashpagination";
import fadeWhenScroll from "@/common/fadeWhenScroll";
import caseStudyData from "@/data/case-study.json";

const swiperOptions = {
  modules: [Navigation, EffectFade],
  speed: 1000,
  effect: "fade",
  navigation: {
    prevEl: ".controls .swiper-button-prev",
    nextEl: ".controls .swiper-button-next",
  },
}

onMounted(() => {
  removeSlashFromBagination();
  fadeWhenScroll(document.querySelectorAll(".fixed-slider .caption"));
});
</script>