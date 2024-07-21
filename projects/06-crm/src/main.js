import './assets/main.css'

import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'

import config from '../formkit.config'
import App from './App.vue'
import router from './router'

const app = createApp(App)

/* Configuramos el router para nuestra aplicación en Vue */
app.use(router)
/* Configuramos formkit para configurar el uso de formularios reactivos */
app.use(plugin, defaultConfig(config))

app.mount('#app')
