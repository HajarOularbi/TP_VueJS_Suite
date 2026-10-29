import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Search from './views/Search.vue'
import Track from './views/Track.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/search', name: 'search', component: Search },
    { path: '/track/:id', name: 'track', component: Track, props: true }
  ],
  scrollBehavior: () => ({ top: 0 })
})
