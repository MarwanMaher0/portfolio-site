<template>
  <header class="freelancre valign">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="img">
            <img src="/img/1711434167660.jpeg" alt="Hero Image" />
          </div>
        </div>
        <div class="col-lg-8 valign">
          <div class="cont">
            <h1 class="cd-headline clip">
              Hi, I'm Marwan — Senior Frontend Engineer &amp; Tech Lead at SIPRC. I've shipped 15 production
              applications in 3 years, leading a team of 6, building
              <span class="cd-words-wrapper">
                <ClientOnly>
                  <AutoTyperVue
                    :text="['Enterprise SaaS Platforms', 'AI &amp; AR Web Experiences', 'Next.js 15 + React 19 Apps', 'Vue 3 / Nuxt 3 Systems', 'Three.js 3D Commerce', 'Accessible UIs at Scale']"
                    :repeat="Infinity" initial-action="erasing" :pre-type-delay="70" :type-delay="70"
                    :pre-erase-delay="2000" :erase-delay="250" erase-style="backspace" caret-animation="smooth"
                    class="color-font fw-600">
                  </AutoTyperVue>
                </ClientOnly>
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div class="states">
        <div class="container">
          <ul class="flex">
            <li class="flex">
              <div class="numb valign">
                <h3>3+</h3>
              </div>
              <div class="text valign">
                <p>
                  Years <br /> Of Experience
                </p>
              </div>
            </li>

            <li class="flex">
              <div class="numb valign">
                <h3>15</h3>
              </div>
              <div class="text valign">
                <p>
                  Production Apps <br /> Shipped
                </p>
              </div>
            </li>

            <li class="flex">
              <div class="numb valign">
                <h3>6</h3>
              </div>
              <div class="text valign">
                <p>
                  Engineers <br /> Led at SIPRC
                </p>
              </div>
            </li>

            <li class="mail-us">
              <a href="mailto:marwanmaher635@Gmail.Com?subject=Get in Touch">
                <div class="flex">
                  <div class="text valign">
                    <div class="full-width">
                      <p>Get In Touch</p>
                      <h6>Marwanmaher635@Gmail.Com</h6>
                    </div>
                  </div>
                  <div class="mail-icon">
                    <div class="icon-box">
                      <span class="icon color-font pe-7s-mail"></span>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="line bottom left"></div>
  </header>
</template>

<script setup>
import { AutoTyperVue } from "auto-typer-vue3";
</script>

<style>
span.right {
  display: none !important;
}

span.caret:empty:before {
  content: "\200B";
  background: #fff;
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
}
</style>
