<template>
  <div>
    <Navbar theme="light" />
    <FreelanceHeader />
    <HowIWork />
    <CaseStudies />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Common/Navbar';
import FreelanceHeader from '@/components/Headers/FreelanceHeader';
import HowIWork from '@/components/Services/HowIWork';
import CaseStudies from '@/components/Works/CaseStudies';
import Footer from '@/components/Common/Footer';

definePageMeta({
  layout: "light",
});
</script>
