<template>
  <section class="blog-pg single section-padding pt-0">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="post">
            <Image />
            <Content />
            <Pagination />
            <CommentsArea />
            <CommentsForm :theme="theme" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Image from './Details/Image';
import Content from './Details/Content';
import Pagination from './Details/Pagination';
import CommentsArea from './Details/CommentsArea';
import CommentsForm from './Details/CommentsForm';

const { theme } = defineProps(["theme"]);
</script>