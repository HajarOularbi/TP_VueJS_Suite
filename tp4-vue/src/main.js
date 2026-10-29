import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// .use(router) branche le routeur sur toute l'application
createApp(App).use(router).mount('#app')
