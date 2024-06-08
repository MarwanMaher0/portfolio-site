<template>
  <section class="team-vid section-padding bg-dark pt-0" data-overlay-dark="0">
    <div class="container" style="position:static;">
      <Video :video="teamVideo.video" />
      <Team :team="teamVideo.team" />
    </div>

    <div class="circle-blur"></div>
    <div class="circle-blur two"></div>
  </section>
</template>

<script setup>
import Video from "./Video";
import Team from "./Team";
import teamVideo from "@/data/mobile-app/team-vid.json";
</script>
