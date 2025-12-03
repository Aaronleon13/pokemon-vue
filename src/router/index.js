import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import DashboardView from '../views/DashboardView.vue'

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
  ],
})

// Middleware AuthGuard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem(import.meta.env.VITE_KEY_STORAGE)

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Auth' })
  }

  if (to.name === 'Auth' && isAuthenticated) {
    next({ name: 'Dashboard' })
  }

  next()
})

export default router
