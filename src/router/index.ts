import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home/index.vue')
  },
  {
    path: '/study-plan',
    name: 'StudyPlan',
    component: () => import('../pages/StudyPlan/index.vue')
  },
  {
    path: '/study-plan/:id',
    name: 'StudyPlanDetail',
    component: () => import('../pages/StudyPlan/detail.vue')
  },
  {
    path: '/my-plan',
    name: 'MyPlan',
    component: () => import('../pages/MyPlan/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 