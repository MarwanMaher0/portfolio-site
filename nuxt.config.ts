import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://marwanmaher.vercel.app';
const TITLE = 'Marwan Maher — Technical PM & Engineer · IP/Legal-tech · Django · Vue · LLM pipelines';
const DESCRIPTION =
  'Technical Project Manager and engineer running the IT portfolio of a Riyadh IP-services firm: five production systems, from an IP-management platform with 52 live services to a trademark-watch pipeline monitoring registries across 21 countries, built with Django, Vue, PostgreSQL and LLM pipelines.';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    shim: false
  },
  alias: {
    "@": fileURLToPath(new URL('./', import.meta.url)),
  },
  app: {
    head: {
      title: TITLE,
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: DESCRIPTION },
        { name: "author", content: "Marwan Maher" },
        { name: "format-detection", content: "telephone=no" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: SITE_URL },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "alternate icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: SITE_URL },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap",
        },
      ],
      script: [
        { src: "/js/wow.min.js" },
      ]
    }
  }
})
