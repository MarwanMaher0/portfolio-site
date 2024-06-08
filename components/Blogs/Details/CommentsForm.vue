<template>
  <div class="comment-form">
    <h5>Add Comment :</h5>
    <div class="form">
      <form action="">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <textarea placeholder="Your Comment"></textarea>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input type="text" placeholder="Your Name" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input type="email" placeholder="Your Email" />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group text-center">
              <NuxtLink to="#0" :class="`butn ${theme ? (theme === 'light' ? 'dark' : '') : 'light'
                } curve full-width`">
                Comment
              </NuxtLink>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const { theme } = defineProps(["theme"]);
</script>