<template>
  <section class="about-cr">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6 img md-mb50">
          <img src="/img/intro/4.jpg" alt="" />
        </div>
        <div class="col-lg-4 valign">
          <div class="cont full-width">
            <h3 class="color-font">Huge collection.</h3>
            <h6>
              Innovative solutions <br />
              to boost your creative projects.
            </h6>
            <ModalVideo :channel="videoChannel" :videoId="videoId" :isOpen.sync="videoIsOpen" :onClose="onClose" />
            <div class="vid-area">
              <div class="vid-icon">
                <a class="vid" @click="openVideo">
                  <div class="vid-butn back-color">
                    <span class="icon">
                      <i class="fas fa-play"></i>
                    </span>
                  </div>
                </a>
              </div>
              <div class="valign">
                <span class="text">Watch Video</span>
              </div>
            </div>
            <div class="states">
              <h2 class="color-font fw-700">
                125 <span class="fz-30">k</span>
              </h2>
              <p>Projects completed around the world</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ModalVideo from '@/components/Common/ModalVideo.vue';

const videoIsOpen = ref(false);
const videoChannel = "vimeo";
const videoId = "127203262";

function openVideo() {
  videoIsOpen.value = !videoIsOpen.value;
}

function onClose() {
  videoIsOpen.value = false;
}
</script>