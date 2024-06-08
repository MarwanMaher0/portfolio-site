<template>
  <div class="col-lg-3">
    <div class="sidebar md-mb50">
      <div class="row">
        <div class="col-lg-12 col-md-6">
          <div class="search mb-30">
            <form>
              <div class="form-group">
                <input type="text" name="shop-search" placeholder="Search">
                <button>
                  <span class="icon pe-7s-search"></span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="col-lg-12 col-md-6">
          <div class="box gat mb-30">
            <h6 class="title mb-30">Category</h6>
            <ul>
              <li v-for="category, idx in categories" :key="idx">
                <NuxtLink to="#0">{{ category.title }} <span>{{ category.productsCount > 10 ?
                  category.productsCount : '0' + category.productsCount }}</span></NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-12 col-md-6">
          <div class="box filter-price mb-30">
            <h6 class="title mb-30">Filter By Price</h6>
            <div class="range-slider mb-30">
              <div id="tooltip"></div>
              <input id="range" type="range" :step="priceFilter.step" :value="priceFilter.value" :min="priceFilter.min"
                :max="priceFilter.max" @input="setValue()">
              <div class="start-pointe">$ {{ priceFilter.min }}</div>
            </div>
          </div>
        </div>

        <div class="col-lg-12 col-md-6">
          <div class="box tags">
            <h6 class="title mb-30">Popular Tags</h6>
            <div>
              <NuxtLink to="#0" v-for="tag, idx in tags" :key="idx">{{ tag }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { categories, tags, priceFilter } = defineProps(['categories', 'tags', 'priceFilter']);

function setValue() {
  const range = document.querySelector("#range");
  const newValue = Number(((range.value - range.min) * 100) / (range.max - range.min));
  const newPosition = 16 - newValue * 0.32;
  const tooltip = document.getElementById('tooltip');

  tooltip.innerHTML = `<span>${range.value}</span>`;
  tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;

  document.documentElement.style.setProperty("--range-progress", `calc(${newValue}% + (${newPosition}px))`);
  let a = range.value
  range.value = a
}

onMounted(() => {
  setValue()
});
</script>
