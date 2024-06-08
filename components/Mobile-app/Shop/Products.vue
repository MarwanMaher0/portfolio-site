<template>
  <div class="col-lg-9">
    <div class="store">
      <div class="top-area">
        <div class="row">
          <div class="col-lg-4 valign">
            <div class="result-text">
              <span>Showing 1 - 12 of 30 Results</span>
            </div>
          </div>
          <div class="col-lg-8 d-flex justify-content-end">
            <div class="filter-select">
              <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6" v-for="product in products" :key="product.id">
          <div class="item">
            <div class="img">
              <img :src="product.image" alt="">
              <span class="tag">{{ product.tag }}</span>
              <div class="add">
                <NuxtLink to="#0">Add To Cart <span class="pe-7s-angle-right"></span></NuxtLink>
              </div>
            </div>
            <div class="info">
              <h6>{{ product.name }}</h6>
              <span>${{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { products } = defineProps(['products']);
</script>
