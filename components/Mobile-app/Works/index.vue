<template>
  <section class="app-works section-padding">
    <div class="container">
      <div class="row">
        <!-- filter links -->
        <div class="filtering col-12">
          <div class="filter custom-font wow fadeIn" data-wow-delay=".5s"
            style="visibility: visible; animation-delay: 0.5s; animation-name: fadeIn;">
            <span :data-filter="filter.operator" :class="idx === 0 ? 'active' : ''" v-for="filter, idx in works.filters"
              :key="idx">
              {{ filter.type }}
            </span>
          </div>
        </div>

        <!-- gallery -->
        <div class="gallery full-width" style="position: relative; height: 2246.51px;">
          <!-- gallery item -->
          <div :class="`col-md-6 items ${work.type} wow fadeInUp`" data-wow-delay=".4s" v-for="work, idx in works.works"
            :key="idx">
            <div class="item-img">
              <NuxtLink :to="`/project-details2/project-details2-${theme || 'dark'}`" class="imago wow animated">
                <img :src="work.image" alt="image">
                <div class="item-img-overlay"></div>
              </NuxtLink>
              <div class="cont valign">
                <div class="full-width text-center">
                  <span class="icon pe-7s-angle-right"></span>
                  <h5>{{ work.title }}</h5>
                  <span class="tags">{{ work.tags }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import initIsotope from "@/common/initIsotope";
import works from "@/data/mobile-app/works.json";

const { theme } = defineProps(['theme']);

onMounted(() => {
  setTimeout(() => {
    initIsotope();
  }, 500);
});
</script>
