<template>
  <nav ref="navbar" class="navbar navbar-expand-lg change" :class="theme === 'light' ? 'light' : ''">
    <div class="container">
      <NuxtLink to="/" class="">
        <span>Marwan Maher</span>
      </NuxtLink>

      <button class="navbar-toggler" type="button" @click="handleMobileDropdown" data-toggle="collapse"
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="icon-bar">
          <i class="fas fa-bars"></i>
        </span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li v-for="link in links" :key="link.id" class="nav-item">
            <a :href="`#${link.id}`" class="nav-link" @click.prevent="scrollToSection(link.id)">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const { theme } = defineProps(["theme"]);

const links = [
  { id: 'Home', label: 'Home' },
  { id: 'How', label: 'How I work' },
  { id: 'Work', label: 'Work' },
  { id: 'Contact', label: 'Contact' },
];

function handleMobileDropdown() {
  document.getElementById("navbarSupportedContent").classList.toggle("show-with-trans");
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  const menu = document.getElementById("navbarSupportedContent");
  if (menu) menu.classList.remove("show-with-trans");
}

const navbar = ref();
</script>
