import { createRouter, createWebHistory } from 'vue-router'
import { tokenService } from '@/shared/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/features/auth/views/LoginView.vue'),
    },
    {
      path: '/register',
      component: () => import('@/features/auth/views/RegisterView.vue'),
    },
    {
      path: '/',
      component: () => import('@/features/test/TestView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  const hasToken = tokenService.hasToken()

  if (to.meta.requiresAuth && !hasToken) {
    return '/login'
  }

  if (hasToken && (to.path === '/login' || to.path === '/register')) {
    return '/'
  }
})

export default router
