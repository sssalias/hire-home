import { createRouter, createWebHistory } from 'vue-router'
import { tokenService } from '@/shared/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('@/app/layout/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/features/auth/views/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/features/auth/views/RegisterView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/app/layout/AppLayout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'test',
          component: () => import('@/features/test/TestView.vue'),
          meta: {
            title: 'Тестfff',
          },
        },
        {
          path: 'candidates',
          name: 'candidates',
          component: () => import('@/features/candidate/views/CandidateView.vue'),
          meta: {
            title: 'Кандидаты',
          },
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const hasToken = tokenService.hasToken()

  if (to.meta.requiresAuth && !hasToken) {
    return '/auth/login'
  }

  if (hasToken && (to.path === '/auth/login' || to.path === '/auth/register')) {
    return '/'
  }
})

export default router
