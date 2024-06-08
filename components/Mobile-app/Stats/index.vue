<template>
  <section class="serv-block section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 valign">
          <div class="content md-mb50">
            <h6 class="stit mb-30"><span class="left"></span> Company Statistics</h6>
            <h2 class="mb-30">We’re Professional Agency and We’ve Lot’s of Goods Achievements</h2>
            <div class="app-sta">
              <div class="row">
                <div class="col-sm-6" v-for="stat, idx in stats" :key="idx">
                  <div :class="`item ${idx !== stats.length - 1 || idx !== stats.length - 2 ? 'mb-30' : ''}`">
                    <span :class="`icon ${stat.icon}`"></span>
                    <h3>{{ stat.value }}+</h3>
                    <p>{{ stat.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="serv-img">
            <img src="/mobile-app/img/app-img/s2-light.png" alt="" v-if="theme === 'light'">
            <img src="/mobile-app/img/app-img/s2.png" alt="" v-else>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import stats from "@/data/mobile-app/stats.json";

const { theme } = defineProps(['theme']);
</script>