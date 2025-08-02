import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/vue-toastification'
  ],
  modules: [
    '@pinia/nuxt',
    // إضافة vuetify إلى إعدادات Vite
    async (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
      userId: process.env.NUXT_PUBLIC_USER_ID
    }
  },
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        dir: "rtl",
      },
    },
  },
  build: {
    transpile: ["vuetify"]
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
