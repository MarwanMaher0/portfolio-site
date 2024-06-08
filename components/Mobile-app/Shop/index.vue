<template>
  <section class="shop section-padding">
    <div class="container">
      <div class="row">
        <Sidebar :categories="ShopData.categories" :tags="ShopData.tags" :priceFilter="ShopData.priceFilter" />
        <Products :products="ShopData.products" />
      </div>
    </div>
  </section>
</template>

<script setup>
import Sidebar from './Sidebar';
import Products from './Products';
import ShopData from "@/data/mobile-app/shop.json";
</script>
