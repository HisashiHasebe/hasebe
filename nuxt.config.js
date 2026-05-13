// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-13',

  ssr: false,

  app: {
    head: {
      title: 'hasebe',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/cors-pdf-test'],
      failOnError: false,
    }
  },

  experimental: {
    viteEnvironmentApi: true,
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || ''
    }
  }
})
