<template>
  <section class="contact-sec section-padding position-re">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="sec-head text-center">
            <h6 class="wow fadeIn" data-wow-delay=".5s">Contact Us</h6>
            <h3 class="wow color-font">
              Let's Get in Touch And Make Magic Together.
            </h3>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="form wow fadeInUp" data-wow-delay=".5s">
            <form id="contact-form" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
              <div class="messages"></div>
              <div class="controls">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-group">
                      <input v-model="form.name" type="text" name="name" placeholder="Name" required="required" />
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <input v-model="form.email" type="email" name="email" placeholder="Email" required="required" />
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <input v-model="form.subject" type="text" name="subject" placeholder="Subject"
                        required="required" />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <textarea v-model="form.message" name="message" placeholder="Message" rows="4"
                        required="required"></textarea>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="text-center">
                      <button type="submit" class="butn bord curve mt-30">
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                </div>
                <!-- Hidden input for Netlify honeypot -->
                <div style="display: none;">
                  <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!noLine" class="line bottom left"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
const { noLine } = defineProps(['noLine']);

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});
</script>
