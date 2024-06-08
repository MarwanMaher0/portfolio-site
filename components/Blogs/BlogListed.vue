<template>
  <section class="blog-pg blog-list section-padding pt-0">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="posts mt-80">
            <div v-for="blogItem in blogs" class="item mb-80 wow fadeInUp" :key="blogItem.id" data-wow-delay=".3s">
              <div class="row">
                <div class="col-lg-6 valign">
                  <div class="img md-mb50">
                    <img :src="blogItem.image" alt="" />
                  </div>
                </div>
                <div class="col-lg-6 valign">
                  <div class="cont">
                    <div>
                      <div class="info">
                        <NuxtLink to="#0" class="date">
                          <span>
                            <i>{{ blogItem.date.day }}</i>
                            {{ blogItem.date.month }}
                          </span>
                        </NuxtLink>
                        <span>/</span>

                        <NuxtLink class="tag" v-for="(tag, index) in blogItem.tags" :key="index" to="#">
                          <span>{{ tag }}</span>
                        </NuxtLink>
                      </div>
                      <h5>
                        <NuxtLink to="/blog-details/blog-details-dark">
                          {{ blogItem.title }}
                        </NuxtLink>
                      </h5>
                      <p class="mt-10">
                        {{ blogItem.content.substr(0, 146) + "..." }}
                      </p>
                      <div class="btn-more mt-30">
                        <NuxtLink to="/blog-details/blog-details-dark" class="simple-btn">
                          Read More
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pagination">
              <span class="active">
                <a href="#">1</a>
              </span>
              <span>
                <a href="#">2</a>
              </span>
              <span>
                <a href="#">
                  <i class="fas fa-angle-right"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import blogs from "@/data/blogs2.json";
</script>