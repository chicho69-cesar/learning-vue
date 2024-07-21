import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

/* Configuramos nuestra aplicación para poder utilizar estados globales
con pinia */
app.use(createPinia())
app.use(router)

app.mount('#app')
