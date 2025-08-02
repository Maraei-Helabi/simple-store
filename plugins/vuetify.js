import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import { ar } from 'vuetify/locale'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    rtl: true,
    locale: {
      locale: 'ar',
      fallback: 'en',
      messages: { ar }
    },
        theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#000000FF", 
            secondary: "#dedede" 
            
          }
        },
      }
    },
  })
  nuxtApp.vueApp.use(vuetify)
})