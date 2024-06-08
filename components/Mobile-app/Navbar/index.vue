<template>
  <nav ref="navbar" class="navbar navbar-expand-lg">
    <div class="container">
      <!-- Logo -->
      <a to="/" class="logo">
        <img ref="lr" src="/img/logo-gr.png" v-if="grLogo" alt="logo" />
        <img ref="lr" src="/img/logo-dark.png" v-else-if="theme && theme === 'light'" alt="logo" />
        <img ref="lr" src="/img/logo-light.png" v-else-if="theme && theme === 'themeD'" alt="logo" />
        <img ref="lr" src="/img/logo-light.png" v-else alt="logo" />
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        @click="handleMobileDropdown">
        <span class="icon-bar"><i class="fas fa-bars"></i></span>
      </button>

      <!-- navbar links -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown" @click="handleDropdown">
            <span class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              Home
            </span>
            <div class="dropdown-menu">
              <a class="dropdown-item" :href="`/homepage/home1-${theme === 'light' ? 'light' : 'dark'}`">Main Home
              </a>
              <a class="dropdown-item" :href="`/homepage/home2-${theme === 'light' ? 'light' : 'dark'}`">Creative
                Agency</a>
              <a class="dropdown-item" :href="`/homepage/home5-${theme === 'light' ? 'light' : 'dark'}`">Digital Agency
              </a>
              <a class="dropdown-item" :href="`/homepage/home4-${theme === 'light' ? 'light' : 'dark'}`">Business One
                Page</a>
              <a class="dropdown-item" :href="`/homepage/home3-${theme === 'light' ? 'light' : 'dark'}`">Corporate
                Business</a>
              <a class="dropdown-item" :href="`/homepage/home6-${theme === 'light' ? 'light' : 'dark'}`">Modern Agency
              </a>
              <a class="dropdown-item" :href="`/homepage/home7-${theme === 'light' ? 'light' : 'dark'}`">Freelancer
              </a>
              <a class="dropdown-item" :href="`/homepage/home8-${theme === 'light' ? 'light' : 'dark'}`">Architecture
              </a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="`/mobile-app/services-${theme === 'light' ? 'light' : 'dark'}`">Services
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="`/mobile-app/pricing-plan-${theme === 'light' ? 'light' : 'dark'}`">Pricing
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="`/mobile-app/portfolio-${theme === 'light' ? 'light' : 'dark'}`">Portfolio
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="`/mobile-app/shop-${theme === 'light' ? 'light' : 'dark'}`">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="`/contact/contact-${theme === 'light' ? 'light' : 'dark'}`">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import getSiblings from "@/common/getSiblings";

const { lr, theme, nr, grLogo } = defineProps(["lr", "theme", "nr", "grLogo"]);

function handleDropdown(e) {
  getSiblings(e.target.parentElement).filter((item) => item.classList.contains("show")).map((item) => {
    item.classList.remove("show");
    if (item.childNodes[0]) item.childNodes[0].setAttribute("aria-expanded", false);
    if (item.childNodes[1]) item.childNodes[1].classList.remove("show");
  });

  e.target.setAttribute("aria-expanded", true);

  if (e.target.parentElement) {
    e.target.parentElement.classList.toggle("show");
    let dropdownMenu = e.target.parentElement.childNodes[1];
    if (dropdownMenu) dropdownMenu.classList.toggle("show");
  }
}

function handleMobileDropdown(e) {
  document.getElementById("navbarSupportedContent").classList.toggle("show-with-trans");
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
