import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddJob from '../views/AddJob.vue'
import JobDetail from '../views/JobDetail.vue'
import EditJob from '../views/EditJob.vue'

// Chaque route relie une adresse (URL) à une page (composant)
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/add', name: 'add', component: AddJob },
  { path: '/jobs/:id', name: 'detail', component: JobDetail },
  { path: '/jobs/:id/edit', name: 'edit', component: EditJob }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
