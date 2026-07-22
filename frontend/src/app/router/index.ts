import { createRouter, createWebHistory } from 'vue-router'

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
  ],
})

export default router
