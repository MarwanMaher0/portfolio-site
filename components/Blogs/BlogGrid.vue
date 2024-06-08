<template>
  <section class="blog-pg blog section-padding pt-0">
    <div class="container">
      <div class="posts">
        <div class="row">
          <div v-for="blogItem in blogs" class="col-lg-4" :key="blogItem.id">
            <div class="item mb-80 wow fadeInUp" data-wow-delay=".3s">
              <div class="img">
                <img :src="blogItem.image" alt="" />
              </div>
              <div class="cont">
                <div>
                  <div class="info">
                    <NuxtLink to="/blog-details/blog-details-dark" class="date">
                      <span>
                        <i>{{ blogItem.date.day }}</i> {{ blogItem.date.month }}
                      </span>
                    </NuxtLink>
                    <span>/</span>
                    <NuxtLink v-for="(tag, index) in blogItem.tags" :key="index" to="#0" class="tag">
                      <span>{{ tag }}</span>
                    </NuxtLink>
                  </div>
                  <h5>
                    <NuxtLink to="/blog-details/blog-details-dark">
                      {{ blogItem.title.substr(0, 55) + "..." }}
                    </NuxtLink>
                  </h5>
                  <div class="btn-more">
                    <NuxtLink class="simple-btn" to="/blog-details/blog-details-dark">
                      Read More
                    </NuxtLink>
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
  </section>
</template>

<script setup>
import blogs from "@/data/blogs3.json";
</script>