import { fileURLToPath } from 'node:url';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    shim: false
  },
  nitro: {},
  runtimeConfig: {
    email: process.env.EMAIL,
    emailPassword: process.env.EMAIL_PASSWORD
  },


  alias: {
    "@": fileURLToPath(new URL('./', import.meta.url)),
  },
  app: {
    head: {
      title: "Vie",
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "keywords",
          name: "keywords",
          content: "Nuxt3 Vue Template vie onepage themeforest",
        },
        {
          hid: "description",
          name: "description",
          content: "vie - Onepage Multi-Purpose Vue Nuxt3 Template",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap",
        }
      ],
      script: [
        { src: "/js/wow.min.js" },
        { src: "/js/isotope.pkgd.min.js" },
        { src: "/js/pace.min.js" },
        { src: "/js/splitting.min.js" },
        { src: "/js/simpleParallax.min.js" },
      ]
    }
  },
  css: [
    'swiper/css/bundle',
    '@/styles/modal-video.css',
    '@/styles/globals.css'
  ],
  webpack: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        layouts: true
      }
    }
  },
  build: {
    transpile: [
      "vue3-count-to",
      "vue3-particles"
    ]
  }
})
