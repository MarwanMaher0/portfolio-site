<template>
  <nav ref="navbar" class="navbar navbar-expand-lg change" :class="theme === 'light' ? 'light' : ''">
    <div class="container">
      <NuxtLink to="/" class="">
        <span>Marwan Maher Mostafa</span>
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
          <li class="nav-item">
            <a @click="scrollToSection('Home')" class="nav-link">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a @click="scrollToSection('About')" class="nav-link">
              About
            </a>
          </li>
          <li class="nav-item">
            <a @click="scrollToSection('Works')" class="nav-link">
              Works
            </a>
          </li>
          <li class="nav-item">
            <a @click="scrollToSection('Contact')" class="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const { lr, theme } = defineProps(["lr", "theme"]);

function handleMobileDropdown() {
  document.getElementById("navbarSupportedContent").classList.toggle("show-with-trans");
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

const navbar = ref();
</script>
