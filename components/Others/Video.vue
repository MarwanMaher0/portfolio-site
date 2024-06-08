<template>
  <section class="video bg-img parallaxie" style="background-image: url('/img/bg-vid.jpg')">
    <ModalVideo :channel="videoChannel" :videoId="videoId" :isOpen.sync="videoIsOpen" :onClose="onClose" />
    <a class="vid valign" @click="openVideo">
      <div class="vid-butn">
        <span class="icon">
          <i class="pe-7s-play"></i>
        </span>
      </div>
    </a>
    <div class="container">
      <div class="stauts">
        <div class="item">
          <h4>3<span>K</span> +</h4>
          <h6>Happy Clients</h6>
        </div>
        <div class="item">
          <h4>14<span>K</span> +</h4>
          <h6>Success Projects</h6>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ModalVideo from '@/components/Common/ModalVideo.vue';

const videoIsOpen = ref(false);

const videoChannel = 'vimeo';
const videoId = '127203262';

function openVideo() {
  videoIsOpen.value = !videoIsOpen.value;
}

function onClose() {
  videoIsOpen.value = false;
}
</script>