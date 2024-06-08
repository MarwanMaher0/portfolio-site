<template>
  <section class="app-faq section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <div class="content md-mb50">
            <h6 class="stit mb-30"><span class="left"></span> Faqs</h6>
            <h2 class="mb-30">Have Any Questions on Minds? Frequently Asked Questions</h2>
            <p> Sed perspiciatis unde omnis natus error sit voluptatem accus doloremque laudantium totarem aperiam eaqupsa
              quae abillo inventore veritatis quasi architecto </p>
            <NuxtLink to="#0" class="butn-bord-red rounded buton mt-30">
              <span>Get Free 7 Days Trial</span>
            </NuxtLink>
          </div>
        </div>
        <div class="col-lg-6 offset-lg-1">
          <div class="content">
            <div class="accordion shadwo">
              <div :class="`item ${question.active ? 'active' : ''} ${idx !== faq.length - 1 ? 'mb-30' : ''}`"
                v-for="question, idx in faq" :key="idx" @click="open">
                <div class="title">
                  <h6>{{ question.question }} <span class="icon pe-7s-angle-right"></span></h6>
                </div>
                <div :class="`accordion-info ${question.active ? 'active' : ''}`">
                  <p>{{ question.answer }}</p>
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
import handleAccordion from "@/common/handleAccordion";
import faq from "@/data/mobile-app/faq.json";

function open(e) {
  let container = e.currentTarget.querySelector(".accordion-info");
  handleAccordion(container);
}
</script>