import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import DashboardView from '../views/DashboardView.vue'
import PokemonView from '../views/PokemonView.vue'
import EditPokemonView from '../views/editPokemonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: AuthView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/pokemon/:slug',
      name: 'Pokemon',
      component: PokemonView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/pokemon/:id/edit',
      name: 'EditPokemon',
      component: EditPokemonView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

// Middleware AuthGuard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem(import.meta.env.VITE_KEY_STORAGE)

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Auth' })
  }

  if (to.name === 'Auth' && isAuthenticated) {
    return next({ name: 'Dashboard' })
  }

  next()
})

export default router
