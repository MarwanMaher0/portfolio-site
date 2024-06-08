<template>
  <section class="funfacts2 block-sec section-padding">
    <div class="container">
      <div class="number-sec">
        <div class="row">
          <div class="col-lg-3 col-md-6">
            <div class="item md-mb50">
              <span class="icon pe-7s-smile"></span>
              <h3 class="custom-font">
                <CountTo ref="countUpRef1" :startVal="0" :endVal="2400" :duration="3000" :autoplay="false">
                  <span class="count">&nbsp;</span>
                </CountTo>
              </h3>
              <p class="wow words chars splitting txt" data-splitting>
                Happy Clients
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="item md-mb50">
              <span class="icon pe-7s-portfolio"></span>
              <h3 class="custom-font">
                <CountTo ref="countUpRef2" :startVal="0" :endVal="133" :duration="3000" :autoplay="false">
                  <span class="count">&nbsp;</span>
                </CountTo>
              </h3>
              <p class="wow txt words chars splitting" data-splitting>
                Compleate Projects
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="item sm-mb50">
              <span class="icon pe-7s-cloud-download"></span>
              <h3 class="custom-font">
                <CountTo ref="countUpRef3" :startVal="0" :endVal="254" :duration="3000" :autoplay="false">
                  <span class="count">&nbsp;</span>
                </CountTo>
                k
              </h3>
              <p class="wow txt words chars splitting" data-splitting>
                Files Downloaded
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="item">
              <span class="icon pe-7s-medal"></span>
              <h3 class="custom-font">
                <CountTo ref="countUpRef4" :startVal="0" :endVal="46" :duration="3000" :autoplay="false">
                  <span class="count">&nbsp;</span>
                </CountTo>
              </h3>
              <p class="wow txt words chars splitting" data-splitting>
                Award Win
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CountTo } from "vue3-count-to";

const countUpRef1 = ref();
const countUpRef2 = ref();
const countUpRef3 = ref();
const countUpRef4 = ref();
const counted = ref(false);

function startCounter() {
  countUpRef1.value.start();
  countUpRef2.value.start();
  countUpRef3.value.start();
  countUpRef4.value.start();
  counted.value = true;
}

onMounted(() => {
  let funFactsSection = document.querySelector(".funfacts2");
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounter();
    }
  }).observe(funFactsSection);
});
</script>