<template>
  <section :class="`app-price section-padding ${bgGray ? 'bg-gray' : ''}`">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="s-head text-center mb-80">
            <h6 class="stit mb-30"><span class="left"></span> Pricing Package <span class="Right"></span></h6>
            <h2>Popular Pricing Package for Design Mobile Application </h2>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="pric-tables">
            <div class="row">
              <div class="col-md-6" v-for="plan, index in pricing" :key="plan.id">
                <div
                  :class="`item ${index !== pricing.length - 1 ? 'sm-mb50' : ''} ${plan.status === 'active' ? 'active' : ''}`">
                  <div class="type text-center mb-15">
                    <h5>{{ plan.title }}</h5>
                  </div>
                  <div class="amount text-center mb-40">
                    <h3><span>$</span> {{ plan.price }}</h3>
                  </div>
                  <div class="order mb-40">
                    <NuxtLink to="#0" :class="`${plan.status === 'active' ? 'butn-gr' : 'butn-gray'} rounded buton`">
                      <span>{{ plan.description }}</span>
                    </NuxtLink>
                  </div>
                  <div class="feat">
                    <ul>
                      <li v-for="feature, idx in plan.features" :key="idx" :class="`${feature.disabled ? 'disbl' : ''}`">
                        <i class="icon">
                          <Icon />
                        </i>
                        {{ feature.title }}
                      </li>
                    </ul>
                  </div>
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
import Icon from "./Icon";
import pricing from "@/data/mobile-app/pricing.json";

const { bgGray } = defineProps(['bgGray']);
</script>
