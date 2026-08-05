import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


const vuetify = createVuetify({
  theme: {

    defaultTheme: 'light',

    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#111111',
          secondary: '#D13639'

        },
      },
    },
  },
  defaults: {
    VBtn: {
        color: 'primary',
        minWidth: 400,
        height: 50,
        class: 'justify-start'
    },
     VCard: {
        color: 'primary',
    },
     VChip: {
        color: 'secondary',
    },
    VDivider: {
        color: 'secondary',
    }
  }
})

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')