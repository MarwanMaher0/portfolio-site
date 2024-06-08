<template>
  <nav class="navbar navbar-expand-lg" ref="navbar">
    <div class="container">
      <NuxtLink to="/" class="logo">
        <img ref="lr" src="/img/logo-dark.png" v-if="theme === 'light'" alt="logo" />
        <img ref="lr" src="/img/logo-light.png" v-else-if="theme === 'themeD'" alt="logo" />
        <img ref="lr" src="/img/logo-light.png" v-else alt="logo" />
      </NuxtLink>

      <button class="navbar-toggler" type="button" data-toggle="collapse" @click="handleMobileDropdown"
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="icon-bar">
          <i class="fas fa-bars"></i>
        </span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown" @click="handleDropdown">
            <span class="nav-link dropdown-toggle" data-toggle="dropdown" data-scroll-nav="0">
              Home
            </span>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="/homepage/home1-dark">
                Main Home
              </a>
              <a class="dropdown-item" href="/homepage/home2-dark">
                Creative Agency
              </a>
              <a class="dropdown-item" href="/homepage/home5-dark">
                Digital Agency
              </a>
              <a class="dropdown-item" href="/homepage/home4-dark">
                Business One Page
              </a>
              <a class="dropdown-item" href="/homepage/home3-dark">
                Corporate Business
              </a>
              <a class="dropdown-item" href="/homepage/home6-dark">
                Modern Agency
              </a>
              <a class="dropdown-item" href="/homepage/home7-dark">
                Freelancer
              </a>
              <a class="dropdown-item" href="/homepage/home8-dark">
                Architecture
              </a>
            </div>
          </li>

          <li class="nav-item">
            <a class="nav-link" @click="scrollToSection" data-scroll-to="#about">About </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="scrollToSection" data-scroll-to="#works"> Works </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="scrollToSection" data-scroll-to="#team"> Team </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="scrollToSection" data-scroll-to="#testimonials"> Testimonials </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="scrollToSection" data-scroll-to="#blogs"> Blog </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="scrollToSection" data-scroll-to="#contact"> Contact </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import getSiblings from "@/common/getSiblings";

const { lr, theme } = defineProps(["lr", "theme"])

function handleDropdown(e) {
  getSiblings(e.target.parentElement)
    .filter((item) => item.classList.contains("show"))
    .map((item) => {
      item.classList.remove("show");
      if (item.childNodes[0]) item.childNodes[0].setAttribute("aria-expanded", false);
      if (item.childNodes[1]) item.childNodes[1].classList.remove("show");
    });

  e.target.setAttribute("aria-expanded", true);

  if (e.target.parentElement) {
    e.target.parentElement.classList.toggle("show");
    let dropdownMenu = e.target.parentElement.childNodes[1];
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");
    }
  }
}

function handleMobileDropdown() {
  document.getElementById("navbarSupportedContent").classList.toggle("show-with-trans");
}

function scrollToSection(event) {
  event.preventDefault();
  const section = event.currentTarget.dataset.scrollTo;
  setTimeout(() => {
    document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

const navbar = ref();

function handleScroll() {
  if (window.scrollY > 300) {
    navbar.value.classList.add("nav-scroll");
  } else {
    navbar.value.classList.remove("nav-scroll");
  }
}

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>