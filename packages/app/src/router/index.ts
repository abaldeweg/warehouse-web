import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API),
  linkActiveClass: 'isActive',
  linkExactActiveClass: 'isActiveExact',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('../views/reservation/ReservationView.vue'),
    },
    {
      path: '/reservation/:id',
      name: 'reservation.detail',
      component: () => import('../views/reservation/DetailView.vue'),
      props: true,
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/account/AccountView.vue'),
    },
    {
      path: '/account/password',
      name: 'account.password',
      component: () => import('../views/account/PasswordView.vue'),
    },
    {
      path: '/account/login',
      name: 'account.login',
      component: () => import('../views/account/LoginView.vue'),
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
  if (to.name === 'account.login') {
    return
  }

  const { checkAuthenticationStatus } = useAuth()

  const authenticated = await checkAuthenticationStatus()
  if (!authenticated) {
    router.push({ name: 'account.login' })
  }
})

export default router
