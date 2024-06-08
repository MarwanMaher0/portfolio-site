<template>
  <section :class="`skills-circle pt-50 pb-50 ${from ? (from === 'aboutPage' ? 'sub-bg' : '') : ''
    }`">
    <div class="container">
      <div class="row">
        <div class="col-lg-7">
          <div class="">
            <div class="row">
              <div class="col-md-6">
                <div class="item wow fadeInLeft" data-wow-delay=".6">
                  <div class="skill">
                    <CircleProgress :percent="90" :show-percent="true" fill-color="rgb(18, 194, 233)"
                      :empty-color="theme == 'dark' ? '#0f1013' : '#e5e5e5'" :border-width="2" :border-bg-width="2"
                      :size="110" unit="%" />
                  </div>
                  <div class="cont">
                    <span>Project</span>
                    <h6>Consulting</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item wow fadeInLeft" data-wow-delay=".3">
                  <div class="skill">
                    <CircleProgress :percent="75" fill-color="rgb(18, 194, 233)"
                      :empty-color="theme == 'dark' ? '#0f1013' : '#e5e5e5'" :border-width="2" :border-bg-width="2"
                      :size="110" :show-percent="true" unit="%" />
                  </div>
                  <div class="cont">
                    <span>App</span>
                    <h6>Development</h6>
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
import CircleProgress from "vue3-circle-progress";

const { from, theme } = defineProps(['from', 'theme']);
</script>