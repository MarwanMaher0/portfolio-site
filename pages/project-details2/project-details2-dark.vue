<template>
  <CommonLoading />
  <Navbar />
  <div class="wrapper">
    <ProjectDetails2Header :projectHeaderData="ProjectDate" />
    <ProjectIntroduction :projectIntroductionData="ProjectDate.intro" />
    <ProjectGallery :projectGalleryData="ProjectDate.gallery" />
    <ProjectDescription :projectDescriptionData="ProjectDate.description" />
    <ProjectVideo :projectVideoData="ProjectDate" />
    <NextProject />
    <Footer />
  </div>
</template>

<script setup>
//= Page components
import Navbar from '@/components/Common/Navbar';
import ProjectDetails2Header from '@/components/Project/ProjectDetails2Header';
import ProjectIntroduction from '@/components/Project/ProjectIntroduction';
import ProjectGallery from '@/components/Project/ProjectGallery';
import ProjectDescription from '@/components/Project/ProjectDescription';
import ProjectVideo from '@/components/Project/ProjectVideo';
import NextProject from '@/components/Project/NextProject';
import Footer from '@/components/Common/Footer';
//= Static Data
import ProjectDate from "@/data/project-details2.json";

//= Page Metadata
definePageMeta({
  layout: "dark",
});

//= Page Head
useHead({
  titleTemplate: `%s - Project Details Dark`
});
</script>