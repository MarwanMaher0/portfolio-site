<template>
  <section class="app-process section-padding pt-0">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-10">
          <div class="s-head text-center mb-80">
            <h6 class="stit mb-30"><span class="left"></span> Working Process <span class="Right"></span></h6>
            <h2>3 Step to Compalte Projects</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4" v-for="step, index in processSteps" :key="step.id">
          <div :class="`item text-center ${index !== processSteps.length - 1 ? 'md-mb50' : ''}`">
            <span :class="`icon ${step.icon}`"></span>
            <h5>{{ step.title }}</h5>
            <span class="step-number" v-if="step.id < 10">Step {{ `0${step.id}` }}</span>
            <span class="step-number" v-else>Step {{ step.id }}</span>
            <p>{{ step.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import processSteps from "@/data/mobile-app/process-steps.json";
</script>
