<template>
  <section class="work-carousel section-padding caroul position-re pb-0">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="sec-head text-center">
            <h6 class="wow fadeIn" data-wow-delay=".5s">Latest Work</h6>
            <h3 class="wow color-font">
              Our Recent Web Design &amp; <br /> Some Past Projects.
            </h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 no-padding">
          <div class="swiper-container">
            <div class="swiper-container">
              <ClientOnly>
                <Swiper v-bind="swiperOptions" class="swiper-wrapper">
                  <SwiperSlide class="swiper-slide">
                    <div class="content wow fadeInUp" data-wow-delay=".3s">
                      <div class="item-img bg-img wow imago" style="background-image: url(/img/portfolio/curs/1.jpg)">
                      </div>
                      <div class="cont bgbox">
                        <h6>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            art &amp; illustration
                          </NuxtLink>
                        </h6>
                        <h4>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            Innovation and Crafts.
                          </NuxtLink>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide class="swiper-slide">
                    <div class="content wow fadeInUp" data-wow-delay=".3s">
                      <div class="item-img bg-img wow imago" style="background-image: url(/img/portfolio/curs/2.jpg)">
                      </div>
                      <div class="cont bgbox">
                        <h6>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            art &amp; illustration
                          </NuxtLink>
                        </h6>
                        <h4>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            Inspiring new space.
                          </NuxtLink>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide class="swiper-slide">
                    <div class="content wow fadeInUp" data-wow-delay=".3s">
                      <div class="item-img bg-img wow imago" style="background-image: url(/img/portfolio/curs/3.jpg)">
                      </div>
                      <div class="cont bgbox">
                        <h6>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            art &amp; illustration
                          </NuxtLink>
                        </h6>
                        <h4>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            Natural plus modern.
                          </NuxtLink>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide class="swiper-slide">
                    <div class="content wow fadeInUp" data-wow-delay=".3s">
                      <div class="item-img bg-img wow imago" style="background-image: url(/img/portfolio/curs/4.jpg)">
                      </div>
                      <div class="cont bgbox">
                        <h6>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            art &amp; illustration
                          </NuxtLink>
                        </h6>
                        <h4>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            Innovation and Crafts.
                          </NuxtLink>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide class="swiper-slide">
                    <div class="content wow fadeInUp" data-wow-delay=".3s">
                      <div class="item-img bg-img wow imago" style="background-image: url(/img/portfolio/curs/5.jpg)">
                      </div>
                      <div class="cont bgbox">
                        <h6>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            art &amp; illustration
                          </NuxtLink>
                        </h6>
                        <h4>
                          <NuxtLink to="/project-details2/project-details2-dark">
                            Inspiring new space.
                          </NuxtLink>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </ClientOnly>
              <div class="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer">
                <i class="ion-ios-arrow-right"></i>
              </div>
              <div class="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer">
                <i class="ion-ios-arrow-left"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';

const swiperOptions = {
  modules: [Navigation],
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  speed: 1000,
  slidesPerView: 1,
  loop: true,
  spaceBetween: 0,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  },
}
</script>