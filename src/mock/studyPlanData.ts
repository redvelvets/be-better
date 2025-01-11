import type { StudyPlan } from './types'

export const studyPlans: StudyPlan[] = [
  {
    id: 1,
    title: 'Python基础入门',
    description: 'Python编程基础学习计划',
    progress: 30,
    days: [
      {
        day: 1,
        title: '初识Python - 了解Python的基础语法和开发环境搭建',
        completed: true
      },
      {
        day: 2,
        title: '基础语法 - 变量、数据类型和基本运算',
        completed: false
      }
    ]
  }
] 