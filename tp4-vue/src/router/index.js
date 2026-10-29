// Étape 1 : configurer les routes
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookDetailsView from '../views/BookDetailsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  // Route statique : la page d'accueil
  { path: '/', name: 'home', component: HomeView },

  // Route dynamique : ":id" change selon le livre (/livre/1, /livre/2...)
  { path: '/livre/:id', name: 'book-details', component: BookDetailsView },

  // Route 404 : attrape toutes les autres URL. Elle doit rester EN DERNIER.
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
