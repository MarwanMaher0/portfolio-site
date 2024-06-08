<template>
  <section class="work-carousel2 metro section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10">
          <div class="sec-head">
            <h6 class="wow fadeIn" data-wow-delay=".5s">Portfolio</h6>
            <h3 class="wow color-font">
              Our Recent Web Design &amp; <br /> Some Past Projects.
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 no-padding">
          <div class="swiper-container">
            <Swiper class="swiper-wrapper" v-bind="swiperOptions">
              <SwiperSlide class="swiper-slide">
                <div class="content">
                  <div class="img">
                    <span class="imgio">
                      <div class="wow cimgio" data-delay="500"></div>
                      <img src="/img/portfolio/2.jpg" alt="" />
                    </span>
                  </div>
                  <div class="cont">
                    <h6>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        art &amp; illustration
                      </NuxtLink>
                    </h6>
                    <h4>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        Inspiring new space
                      </NuxtLink>
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide class="swiper-slide">
                <div class="content">
                  <div class="img">
                    <span class="imgio">
                      <div class="wow cimgio" data-delay="500"></div>
                      <img src="/img/portfolio/1.jpg" alt="" />
                    </span>
                  </div>
                  <div class="cont">
                    <h6>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        art &amp; illustration
                      </NuxtLink>
                    </h6>
                    <h4>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        Inspiring new space
                      </NuxtLink>
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide class="swiper-slide">
                <div class="content">
                  <div class="img">
                    <span class="imgio">
                      <div class="wow cimgio" data-delay="500"></div>
                      <img src="/img/portfolio/3.jpg" alt="" />
                    </span>
                  </div>
                  <div class="cont">
                    <h6>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        art &amp; illustration
                      </NuxtLink>
                    </h6>
                    <h4>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        Inspiring new space
                      </NuxtLink>
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide class="swiper-slide">
                <div class="content">
                  <div class="img">
                    <span class="imgio">
                      <div class="wow cimgio" data-delay="500"></div>
                      <img src="/img/portfolio/4.jpg" alt="" />
                    </span>
                  </div>
                  <div class="cont">
                    <h6>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        art &amp; illustration
                      </NuxtLink>
                    </h6>
                    <h4>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        Inspiring new space
                      </NuxtLink>
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide class="swiper-slide">
                <div class="content">
                  <div class="img">
                    <span class="imgio">
                      <div class="wow cimgio" data-delay="500"></div>
                      <img src="/img/portfolio/5.jpg" alt="" />
                    </span>
                  </div>
                  <div class="cont">
                    <h6>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        art &amp; illustration
                      </NuxtLink>
                    </h6>
                    <h4>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        Inspiring new space
                      </NuxtLink>
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide class="swiper-slide">
                <div class="content">
                  <div class="img">
                    <span class="imgio">
                      <div class="wow cimgio" data-delay="500"></div>
                      <img src="/img/portfolio/6.jpg" alt="" />
                    </span>
                  </div>
                  <div class="cont">
                    <h6>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        art &amp; illustration
                      </NuxtLink>
                    </h6>
                    <h4>
                      <NuxtLink to="/project-details2/project-details2-dark">
                        Inspiring new space
                      </NuxtLink>
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div class=" swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer">
              <i class="ion-ios-arrow-right"></i>
            </div>
            <div class="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer">
              <i class="ion-ios-arrow-left"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper';

const swiperOptions = {
  modules: [Navigation, Autoplay],
  slidesPerView: 2,
  centeredSlides: true,
  autoPlay: true,
  loop: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 1000,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    767: {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: false,
    },
    991: {
      slidesPerView: 2,
    },
  }
}
</script>