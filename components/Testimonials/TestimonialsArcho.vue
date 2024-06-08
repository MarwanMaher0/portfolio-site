<template>
  <section id="testimonials" class="testimonials section-padding position-re">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="sec-head text-center">
            <h2 class="wow fadeIn" data-wow-delay=".3s">Testimonials</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid position-re">
      <div class="row wow fadeInUp" data-wow-delay=".5s">
        <div class="col-lg-12">
          <Swiper v-bind="settings" class="slic-item" data-wow-delay=".5s">
            <SwiperSlide class="item">
              <div class="info inf-lrg valign">
                <div class="cont">
                  <div class="author">
                    <div class="img">
                      <img src="/img/clients/1.jpg" alt="" />
                    </div>
                    <h6 class="author-name color-font">Alex Regelman</h6>
                    <span class="author-details"> Co-founder, Colabrio </span>
                  </div>
                </div>
              </div>
              <div class="valign">
                <p class="fz-20 fw-200">
                  I would highly recommend Vie Digital. I worked with the team
                  on an animation for our &apos;Click &amp; Collect&apos;
                  service.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide class="item">
              <div class="info inf-lrg valign">
                <div class="cont">
                  <div class="author">
                    <div class="img">
                      <img src="/img/clients/1.jpg" alt="" />
                    </div>
                    <h6 class="author-name color-font">Alex Regelman</h6>
                    <span class="author-details"> Co-founder, Colabrio </span>
                  </div>
                </div>
              </div>
              <div class="valign">
                <p class="fz-20 fw-200">
                  I would highly recommend Vie Digital. I worked with the team
                  on an animation for our &apos;Click &amp; Collect&apos;
                  service.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide class="item">
              <div class="info inf-lrg valign">
                <div class="cont">
                  <div class="author">
                    <div class="img">
                      <img src="/img/clients/1.jpg" alt="" />
                    </div>
                    <h6 class="author-name color-font">Alex Regelman</h6>
                    <span class="author-details"> Co-founder, Colabrio </span>
                  </div>
                </div>
              </div>
              <div class="valign">
                <p class="fz-20 fw-200">
                  I would highly recommend Vie Digital. I worked with the team
                  on an animation for our &apos;Click &amp; Collect&apos;
                  service.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide class="item">
              <div class="info inf-lrg valign">
                <div class="cont">
                  <div class="author">
                    <div class="img">
                      <img src="/img/clients/1.jpg" alt="" />
                    </div>
                    <h6 class="author-name color-font">Alex Regelman</h6>
                    <span class="author-details"> Co-founder, Colabrio </span>
                  </div>
                </div>
              </div>
              <div class="valign">
                <p class="fz-20 fw-200">
                  I would highly recommend Vie Digital. I worked with the team
                  on an animation for our &apos;Click &amp; Collect&apos;
                  service.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div class="arrows">
        <div class="container">
          <div @click="showNext" class="next cursor-pointer">
            <span class="pe-7s-angle-right"></span>
          </div>
          <div @click="showPrev" class="prev cursor-pointer">
            <span class="pe-7s-angle-left"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="line-v top"></div>
    <div class="line-v bottom"></div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper';
import removeSlashFromBagination from '@/common/removeSlashpagination';

const settings = {
  modules: [Autoplay, Navigation],
  loop: true,
  navigation: {
    prevEl: ".arrows .prev",
    nextEl: ".arrows .next",
  },
  centeredSlides: true,
  autoplay: true,
  slidesPerView: 3,
  spaceBetween: 60,
  breakpoints: {
    1024: {
      slidesPerView: 3,
      centeredSlides: false,
    },
    767: {
      slidesPerView: 1,
      centeredSlides: false,
    },
    480: {
      slidesPerView: 1,
      centeredSlides: false,
    }
  },
}

onMounted(() => {
  removeSlashFromBagination();
});
</script>