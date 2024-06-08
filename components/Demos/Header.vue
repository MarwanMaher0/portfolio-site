<script setup>
import { ParticlesComponent as Particles } from "vue3-particles";
import particlesOption from "@/config/particle-config";

const backgroundPosition = useState('backgroundPosition', () => 0);

function handleScroll() {
  backgroundPosition.value = -(window.scrollY - 0.25 * window.scrollY);
}

onMounted(() => {
  if (document.querySelector("#particles-js canvas")) document.querySelector("#particles-js canvas").style.position = "unset";

  backgroundPosition.value = -(window.scrollY - 0.25 * window.scrollY);
  window.addEventListener('scroll', handleScroll);

});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="works-header particles valign bg-img parallaxie" data-overlay-dark="4" :style="{
    backgroundImage: `url(/demo-img/bg.png)`,
    minHeight: '100vh',
    zIndex: '99999',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center ' + backgroundPosition + 'px'
  }">
    <Particles id="particles-js" :options="particlesOption" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-9 col-md-11 static">
          <div class="capt mt-50">
            <div class="bactxt custom-font valign">
              <span class="full-width" style="color: transparent"> vie </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>