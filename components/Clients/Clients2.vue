<template>
  <section class="clients sub-bg pt-50 pb-50">
    <div class="container">
      <div class="row">
        <div class="col-lg-7">
          <div class="row">
            <div v-for="item in clientsData.slice(0, length)" :key="item.id" class="col-lg-3 brands">
              <div class="item no-bord wow fadeIn" data-wow-delay=".3s">
                <div class="img">
                  <img v-if="theme === 'light'" :src="item.lightImage" alt="" />
                  <img v-else :src="item.darkImage" alt="" />
                  <a to="#0" class="link words chars splitting" data-splitting>
                    {{ item.url }}
                  </a>
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
import clientsData from "@/data/clients.json";

const { theme, length } = defineProps(['theme', 'length']);
</script>