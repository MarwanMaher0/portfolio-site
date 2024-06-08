<template>
  <header ref="fixedSlider" class="slider slider-prlx fixed-slider text-center">
    <div class="swiper-container parallax-slider">
      <Swiper v-bind="swiperOptions" class="swiper-wrapper">
        <SwiperSlide v-for="slide in intro1Data" :key="slide.id" class="swiper-slide">
          <div class="bg-img valign" :style="`background-image: url(${slide.image})`" data-overlay-dark="6">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10">
                  <div class="caption center mt-30">
                    <h1 class="color-font">{{ slide.title }}</h1>
                    <p v-if="slide.content">
                      {{ slide.content }}
                    </p>
                    <a href="#" class="butn bord curve mt-30">
                      <span>Look More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="setone setwo">
        <div ref="navigationNextRef" class="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer">
          <i class="fas fa-chevron-right"></i>
        </div>
        <div ref="navigationPrevRef" class="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer">
          <i class="fas fa-chevron-left"></i>
        </div>
      </div>
      <div ref="paginationRef" class="swiper-pagination top botm"></div>

      <div class="social-icon">
        <a href="#">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#">
          <i class="fab fa-behance"></i>
        </a>
        <a href="#">
          <i class="fab fa-pinterest-p"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Parallax } from 'swiper';
//= Scripts
import removeSlashFromBagination from "@/common/removeSlashpagination";
import fadeWhenScroll from "@/common/fadeWhenScroll";
//= Static Data
import intro1Data from "@/data/intro1.json";

const { sliderRef } = defineProps(['sliderRef']);

const fixedSlider = ref();
defineExpose({
  fixedSlider
});

const swiperOptions = {
  modules: [Parallax, Navigation, Pagination],
  speed: 1000,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  parallax: true,
  pagination: {
    type: "fraction",
    clickable: true,
    el: ".swiper-pagination",
  },
  onSwiper: handleSwiperReadied
}

function handleSwiperReadied(swiper) {
  setTimeout(() => {
    for (var i = 0; i < swiper.slides.length; i++) {
      swiper.slides[i].childNodes[0].setAttribute(
        "data-swiper-parallax",
        0.75 * swiper.width
      );
    }
  }, 0);
}

onMounted(() => {
  removeSlashFromBagination();
  fadeWhenScroll(document.querySelectorAll(".fixed-slider .caption"));
});
</script>