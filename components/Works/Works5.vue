<template>
  <section class="portfolio-frl section-padding pb-70">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="sec-head text-center">
            <h6 class="wow fadeIn" data-wow-delay=".5s">Portfolio</h6>
            <h3 class="wow color-font">
              Our Recent Web Design &amp; <br />
              Some Past Projects.
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="filtering col-12">
          <div class="filter wow fadeIn" data-wow-delay=".5s">
            <span data-filter="*" class="active"> All </span>
            <span data-filter=".NuxtJs">NuxtJs</span>
            <span data-filter=".VueJs">Vue.Js</span>
            <span data-filter=".HTML">HTML</span>
          </div>
        </div>

        <div class="gallery full-width">
          <div class="col-md-6 items NuxtJs graphic lg-mr wow fadeInUp" data-wow-delay=".4s">
            <div class="item-img">
              <div class="cont">
                <h6>Jironis</h6>
                <p>Vue - Nuxt App Landing Page</p>
              </div>
              <NuxtLink class="rota" to="https://jironis.vercel.app/">
                <img src="/img/portfolio/freelancer/1.jpg" alt="image" />
                <div class="item-img-overlay"></div>
              </NuxtLink>
              <div class="tags">
                <span>
                  <NuxtLink to="#0">NuxtJs</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">App</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Landing Page</NuxtLink>
                </span>
              </div>
            </div>
          </div>

          <div class="col-md-6 items NuxtJs web wow fadeInUp" data-wow-delay=".4s">
            <div class="item-img">
              <div class="cont">
                <h6>Bonx</h6>
                <p>Vue - Nuxt Gaming Website </p>
              </div>
              <NuxtLink class="rota" to="https://bonx-drab.vercel.app/">
                <img src="/img/portfolio/freelancer/2.jpg" alt="image" />
                <div class="item-img-overlay"></div>
              </NuxtLink>
              <div class="tags">
                <span>
                  <NuxtLink to="#0">NuxtJs</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Gaming</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Website</NuxtLink>
                </span>
              </div>
            </div>
          </div>

          <div class="col-md-6 items VueJs web wow fadeInUp" data-wow-delay=".4s">
            <div class="item-img">
              <div class="cont">
                <h6>Educal Courses</h6>
                <p>Vue- Online Course & Education Vue js</p>
              </div>
              <NuxtLink class="rota" to="https://educal-three.vercel.app/">
                <img src="/img/portfolio/freelancer/3.jpg" alt="image" />
                <div class="item-img-overlay"></div>
              </NuxtLink>
              <div class="tags">
                <span>
                  <NuxtLink to="#0">VueJs</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Education</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Courses</NuxtLink>
                </span>
              </div>
            </div>
          </div>

          <div class="col-md-6 items HTML web graphic wow fadeInUp" data-wow-delay=".4s">
            <div class="item-img">
              <div class="cont">
                <h6>eCommerce Furniture</h6>
                <p>HTML - Furniture Website</p>
              </div>
              <NuxtLink class="rota" to="https://site-design-eta.vercel.app/">
                <img src="/img/portfolio/freelancer/4.jpg" alt="image" />
                <div class="item-img-overlay"></div>
              </NuxtLink>
              <div class="tags">
                <span>
                  <NuxtLink to="#0">HTML</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">eCommerce</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Furniture</NuxtLink>
                </span>
              </div>
            </div>
          </div>

          <div class="col-md-6 items VueJs brand wow fadeInUp" data-wow-delay=".4s">
            <div class="item-img">
              <div class="cont">
                <h6>Resilience Scale For Schools </h6>
                <p>Vue - website to assist engineers in meeting design standards</p>
              </div>
              <NuxtLink class="rota" to="https://resilience-scale-for-schools.netlify.app/">
                <img src="/img/portfolio/freelancer/5.jpg" alt="image" />
                <div class="item-img-overlay"></div>
              </NuxtLink>
              <div class="tags">
                <span>
                  <NuxtLink to="#0">VueJs</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Engineering</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Standards</NuxtLink>
                </span>
              </div>
            </div>
          </div>

          <div class="col-md-6 items HTML brand wow fadeInUp" data-wow-delay=".4s">
            <div class="item-img">
              <div class="cont">
                <h6>Massively</h6>
                <p>HTML - First style I train on</p>
              </div>
              <NuxtLink class="rota" to="https://massively-lovat.vercel.app/">
                <img src="/img/portfolio/freelancer/6.jpg" alt="image" />
                <div class="item-img-overlay"></div>
              </NuxtLink>
              <div class="tags">
                <span>
                  <NuxtLink to="#0">HTML</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Training</NuxtLink>
                </span>
                <span>
                  <NuxtLink to="#0">Website</NuxtLink>
                </span>
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

onMounted(() => {
  setTimeout(() => {
    initIsotope();
  }, 500);
});
</script>
