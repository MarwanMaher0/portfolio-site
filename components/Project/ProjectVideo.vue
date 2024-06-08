<template>
  <section>
    <div class="container-fluid">
      <div class="video-wrapper section-padding bg-img parallaxie valign" :style="`
            background-image: url(${projectVideoData.projectHeaderImage})`" data-overlay-dark="4">
        <div class="full-width text-center">
          <ModalVideo :channel="videoChannel" :videoId="videoId" :isOpen.sync="videoIsOpen" :onClose="onClose" />
          <a href="#" @click="openVideo" class="vid">
            <div class="vid-butn">
              <span class="icon">
                <i class="fas fa-play"></i>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ModalVideo from '@/components/Common/ModalVideo.vue';

const { projectVideoData } = defineProps(['projectVideoData']);

const videoIsOpen = ref(false);

const videoChannel = 'vimeo';
const videoId = '127203262';

function openVideo(e) {
  e.preventDefault();
  videoIsOpen.value = !videoIsOpen.value;
}

function onClose() {
  videoIsOpen.value = false;
}
</script>
