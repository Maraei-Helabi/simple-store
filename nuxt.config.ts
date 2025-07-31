export default defineNuxtConfig({
    plugins: [
    '~/plugins/vuetify'
  ],
    modules: [
    'pinia/nuxt',
  ],
    css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
