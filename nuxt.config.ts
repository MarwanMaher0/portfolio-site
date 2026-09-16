export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',
  devtools: { enabled: false },
  experimental: { viewTransition: true },
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],
  nitro: { prerender: { crawlLinks: true, routes: ['/', '/404.html'] } },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/brand/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/brand/apple-touch-icon.png' },
      ],
      meta: [{ name: 'theme-color', content: '#07100D' }],
    },
  },
})
