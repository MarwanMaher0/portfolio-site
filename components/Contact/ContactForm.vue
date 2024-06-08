<template>
  <section class="contact section-padding">
    <div class="container">
      <div class="row">

        <div class="col-lg-11 offset-lg-1">
          <div class="cont-info">
            <h4 class="fw-700 color-font mb-50">Contact Info.</h4>
            <h3 class="wow" data-splitting>{{ contentFormData.title }}</h3>
            <div class="item mb-40">
              <h5>
                <a to="#0">{{ contentFormData.email }}</a>
              </h5>
              <h5>{{ contentFormData.phone }}</h5>
            </div>
            <h3 class="wow" data-splitting>Visit Us.</h3>
            <div class="item">
              <h6>
                {{ contentFormData.location.first }}
                <br />
                {{ contentFormData.location.second }}
              </h6>
            </div>
            <div class="social mt-50">
              <a to="#0" class="icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a to="#0" class="icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a to="#0" class="icon">
                <i class="fab fa-pinterest"></i>
              </a>
              <a to="#0" class="icon">
                <i class="fab fa-behance"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import contentFormData from "@/data/contact-form.json";

const { theme } = defineProps(['theme']);
</script>