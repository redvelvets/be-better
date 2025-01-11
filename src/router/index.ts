import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home/index.vue'),
    meta: { keepAlive: true }
  },
  {
    path: '/study-plan',
    name: 'StudyPlan',
    component: () => import('@/pages/StudyPlan/index.vue'),
    meta: { keepAlive: true }
  },
  {
    path: '/study-plan/:id',
    name: 'StudyPlanDetail',
    component: () => import('@/pages/StudyPlan/detail.vue')
  },
  {
    path: '/my-plan',
    name: 'MyPlan',
    component: () => import('@/pages/MyPlan/index.vue'),
    meta: { keepAlive: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router 