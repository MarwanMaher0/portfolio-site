<template>
  <div>
    <div class="row justify-content-center mt-100">
      <div class="col-lg-7 col-md-10">
        <div class="s-head text-center mb-80">
          <h6 class="stit mb-30"><span class="left"></span> Meet Our Team <span class="Right"></span></h6>
          <h2>We’ve Experience Team Member to Provide Solutions</h2>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-6" v-for="teamMember, index in team" :key="teamMember.id">
        <div :class="`item text-center ${index !== teamMember.length - 1 ? 'md-mb50' : ''}`">
          <div class="img">
            <img :src="teamMember.image" alt="">
          </div>
          <div class="info">
            <h5>{{ teamMember.name }}</h5>
            <p>{{ teamMember.position }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { team } = defineProps(['team']);
</script>
