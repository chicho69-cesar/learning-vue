import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'

import App from './App.vue'
import router from './router'

const app = createApp(App)

/* Creamos una instancia de vuetify para configurar lo en la aplicación,
este paquete nos ayuda a trabajar con Material Design en Vue. */
const vuetify = createVuetify({
  components,
  directives
})

/* Configuramos nuestra aplicación para usar vuefire, el cual es un 
modulo para trabajar con firebase en Vue. */
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth]
})

app.use(createPinia())

/* Configuramos nuestra aplicación para utilizar vuetify */
app.use(vuetify)

app.use(router)

app.mount('#app')
