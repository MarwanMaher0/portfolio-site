<template>
  <section class="secreen-shots section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-10">
          <div class="s-head text-center mb-80">
            <h6 class="stit mb-30"><span class="left"></span> Apps Screenshot <span class="Right"></span></h6>
            <h2>Amazing Designer Create Our Application Let’s See</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <Swiper v-bind="swiperOptions">
            <SwiperSlide class="SwiperSlide" v-for="screenshot, index in screenshots" :key="index">
              <div class="item">
                <div class="img">
                  <img :src="screenshot" alt="">
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import screenshots from '@/data/mobile-app/screen-shots.json';

const swiperOptions = {
  modules: [Pagination],
  speed: 1000,
  spaceBetween: 30,
  loop: true,
  parallax: false,
  slidesPerView: 5,
  dots: true,
  pagination: {
    type: "bullets",
    clickable: true,
    el: ".secreen-shots .swiper-pagination",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 3,
      centeredSlides: false,
    },
    991: {
      slidesPerView: 5,
    },
  }
}

onMounted(() => {
  let swiperContainer = document.querySelector('.secreen-shots .swiper-container');
  let swiperPagination = document.querySelector('.secreen-shots .swiper-pagination');
  if (swiperContainer) {
    swiperContainer.appendChild(swiperPagination);
  }
});
</script>
