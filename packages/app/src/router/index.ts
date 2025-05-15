import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'isActive',
  linkExactActiveClass: 'isActiveExact',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrderListView.vue'),
    },
    {
      path: '/orders/:id',
      name: 'order.detail',
      component: () => import('../views/OrderDetailView.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
    },
    {
      path: '/password',
      name: 'password',
      component: () => import('../views/PasswordView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'home' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (to.name === 'login') {
    return
  }

  const { isUserAuthenticated } = useAuth()

  const authenticated = await isUserAuthenticated()
  if (!authenticated) {
    router.push({ name: 'login' })
  }
})

export default router
