<template>
  <ClientOnly v-if="isOpen">
    <div class="modal-video" tabIndex='-1' role='dialog' aria-label="video" @click="onClose">
      <div class="modal-video-body">
        <div class="modal-video-inner">
          <button class="modal-video-close-btn" aria-label="video" ref="closeBtn" @click="onClose" />
          <div class="modal-video-movie-wrap">
            <iframe :src="fullVideoUrl" allowFullScreen="allowFullScreen" :autoPlay="autoplay || false" tabIndex='-1' />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { onMounted } from 'vue';

const { videoId, channel, isOpen, onClose, autoplay } = defineProps(['videoId', 'channel', 'isOpen', 'onClose', 'autoplay']);

function getYoutubeUrl(videoId) {
  return '//www.youtube.com/embed/' + videoId
}

function getVimeoUrl(videoId) {
  return '//player.vimeo.com/video/' + videoId
}

let fullVideoUrl;

onMounted(() => {
  if (channel === 'youtube') {
    fullVideoUrl = getYoutubeUrl(videoId)
  } else if (channel === 'vimeo') {
    fullVideoUrl = getVimeoUrl(videoId)
  }
});
</script>