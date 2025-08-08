import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

createApp(App).use(router).mount('#app') // creamos, usamos el router y montamos la app

