<template>
  <section class="app-blog section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-10">
          <div class="s-head text-center mb-80">
            <h6 class="stit mb-30"><span class="left"></span> Blog and News <span class="Right"></span></h6>
            <h2>Read Latest Artices and Tips Latest News & Blog</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6" v-for="blog, index in blogs" :key="blog.id">
          <div :class="`item ${index !== blogs.length - 1 ? 'md-mb50' : ''}`">
            <div class="row">
              <div class="col-md-5">
                <div class="img">
                  <img :src="blog.image" alt="">
                </div>
              </div>
              <div class="col-md-7 valign">
                <div class="cont">
                  <div class="full-width">
                    <div class="tag">
                      <NuxtLink to="#0">{{ blog.tag }}</NuxtLink>
                    </div>
                    <div class="title">
                      <h5>{{ blog.title }}</h5>
                    </div>
                    <div class="info">
                      <NuxtLink to="#0">
                        <span>Post By :</span>
                        {{ blog.author }}
                      </NuxtLink>
                      <NuxtLink to="#0">
                        <span>Comments :</span>
                        <template v-if="blog.comments < 10">
                          (0{{ blog.comments }})
                        </template>
                        <template v-else>
                          ({{ blog.comments }})
                        </template>
                      </NuxtLink>
                    </div>
                    <NuxtLink to="#0" class="butn-bord-red rounded buton">
                      <span>Read More</span>
                    </NuxtLink>
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
import blogs from "@/data/mobile-app/blog.json";
</script>