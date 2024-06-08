<template>
  <section :class="`testimonials ${withIMG
    ? 'section-padding bg-img'
    : withCOLOR
      ? 'section-padding back-color'
      : noPadding
        ? ''
        : 'section-padding'
    } ${classText ? classText : ''}`" :style="`background-image: ${withIMG ? 'url(' + withIMG + ')' : 'none'}`">
    <div v-if="showHead" class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="sec-head text-center">
            <h6 class="wow fadeIn" data-wow-delay=".5s">Testimonials</h6>
            <h3 class="wow color-font">
              We love our clients from all over the world.
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid position-re">
      <div class="row wow fadeInUp" data-wow-delay=".5s">
        <div class="col-lg-12">
          <Swiper v-bind="settings" class="slic-item" data-wow-delay=".5s">
            <SwiperSlide class="item">
              <div class="info valign">
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
              <p>
                I would highly recommend Vie Digital. I worked with the team on
                an animation for our ‘Click &amp; Collect’ service.
              </p>
            </SwiperSlide>
            <SwiperSlide class="item">
              <div class="info valign">
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
              <p>
                I would highly recommend Vie Digital. I worked with the team on
                an animation for our ‘Click &amp; Collect’ service.
              </p>
            </SwiperSlide>
            <SwiperSlide class="item">
              <div class="info valign">
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
              <p>
                I would highly recommend Vie Digital. I worked with the team on
                an animation for our ‘Click &amp; Collect’ service.
              </p>
            </SwiperSlide>
            <SwiperSlide class="item">
              <div class="info valign">
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
              <p>
                I would highly recommend Vie Digital. I worked with the team on
                an animation for our ‘Click &amp; Collect’ service.
              </p>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div class="arrows">
        <div class="container">
          <div class="next cursor-pointer">
            <span class="pe-7s-angle-right"></span>
          </div>
          <div class="prev cursor-pointer">
            <span class="pe-7s-angle-left"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper';
import removeSlashFromBagination from '@/common/removeSlashpagination';

const { withIMG, withCOLOR, noPadding, classText, showHead } = defineProps(["withIMG", "withCOLOR", "noPadding", "classText", "showHead"]);

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