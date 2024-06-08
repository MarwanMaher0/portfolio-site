<template>
  <footer :class="`${!hideBGCOLOR ? 'sub-bg' : ''}`">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="item md-mb50">
            <div class="title">
              <h5>Contact Me</h5>
            </div>
            <ul>
              <li>
                <span class="icon pe-7s-map-marker"></span>
                <div class="cont">
                  <h6>Officeal Address</h6>
                  <p>Assiut , Egypt</p>
                </div>
              </li>
              <li>
                <span class="icon pe-7s-mail"></span>
                <div class="cont">
                  <h6>Email Me</h6>
                  <p>Marwanmaher635@gmail.com</p>
                </div>
              </li>
              <li>
                <span class="icon pe-7s-call"></span>
                <div class="cont">
                  <h6>Call Me</h6>
                  <p>+201025027019</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="item">
            <div class="esmy">
              <span>Marwan Maher Mostafa</span>
            </div>
            <div class="social">
              <a href="https://www.facebook.com/marwan.maher.50746">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/MElg3fre">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/marwan_elg3fre/">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/marwan-maher-b11628227/">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div class="copy-right">
              <p>
                © 2024, Made with passion by <a href="">Marwan Maher</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { hideBGCOLOR } = defineProps(['hideBGCOLOR']);
</script>

<style>
.esmy {
  font-size: x-large;
  padding-bottom: 20px;
}
</style>
