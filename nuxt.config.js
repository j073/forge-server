require('dotenv').config()

export default defineNuxtConfig({
  router: {
    '/': { prerender: true },
    extendRoutes(routes, resolve) {
      routes.push({
        path: '*',
        redirect: '/'
      });
    }
  },
  loadingIndicator: {
    name: 'chasing-dots',
    color: 'purple',
    background: 'green'
  },
  env: {
    API_TOKEN: process.env.API_TOKEN,
    API_URL: process.env.API_URL
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'RAJAZEUS: RTP Live RAJAZEUS: Situs Bocoran RTP Slot Gacor Pragmatic Play Hari Ini Paling Maxwin 2024',
      name: 'description', content: 'Hanya di RAJAZEUS kamu dapat menerima bocoran rtp slot gacor hari ini dengan win rate tertinggi 2024 yang mempermudah pengguna untuk menang taruhan rtp live pola gacor maxwin gampang menang paling akruat' ,
      link: [{ rel: 'icon', type: 'image/png', href: 'https://it-cgg.b-cdn.net/rtp/rajazeus/favicon.webp' }],
    }
  },
  serverMiddleware: [
    { path: '/api/data', handler: '~/server/api.js' }
  ],
  css: [
    '~/assets/css/boot.css',
  ],
  sourcemap: {
    server: true,
    client: false
  },
  modules: [
    'nuxt-lazy-load',
    '@nuxt/image',
    'vue3-carousel-nuxt',
    'nuxt-swiper',
  ],
  security: {
    hidePoweredBy: false
  },
  carousel: {
    prefix: 'MyPrefix'
  },
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.resolve.alias['@vueuse/core'] = '@vueuse/core'
      }
    },
    productionSourceMap: false
  }
})