<template>
  <Navbar theme="light" />
  <FreelanceHeader id="Home" />
  <Services id="About" />
  <Works id="Works" />
  <AboutUs />
  <ContactForm noLine id="Contact" />
  <Footer />
</template>

<script setup>
//= Page Metadata
import Navbar from '@/components/Common/Navbar';
import FreelanceHeader from '@/components/Headers/FreelanceHeader';
import Services from '@/components/Services/Services5';
import Works from '@/components/Works/Works5';
import AboutUs from '@/components/AboutUs/AboutUs2';
import ContactForm from '@/components/Contact/ContactFormS';
import Footer from '@/components/Common/Footer';
definePageMeta({
  layout: "light",
});

//= Page Head
useHead({
  titleTemplate: `Marwan Maher Mostafa`
});
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: unset;
}
</style>