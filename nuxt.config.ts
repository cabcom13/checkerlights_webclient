// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  ssr: false,

  nitro: {
    preset: 'node-server'
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['nuxt-snackbar', '@nuxtjs/leaflet'],
  compatibilityDate: '2024-10-09'
})