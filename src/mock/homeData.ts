import type { CarouselItem, RankingItem } from './types'

export const carouselData: CarouselItem[] = [
  {
    id: 1,
    title: "Web前端开发实战课程",
    imageUrl: "/images/web-dev.jpg",
    description: "从零开始学习Web前端开发，掌握HTML、CSS和JavaScript"
  },
  {
    id: 2,
    title: 'Python基础教程',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    description: '零基础学习Python编程'
  },
  {
    id: 3,
    title: 'Web开发实战',
    imageUrl: 'https://picsum.photos/800/400?random=3',
    description: '前端开发技能提升'
  }
]

export const rankingData: RankingItem[] = [
  {
    id: 1,
    title: "JavaScript高级教程",
    views: 12000,
    rating: 4.5
  },
  {
    id: 2,
    title: 'Python入门课程',
    views: 12000,
    rating: 4.8
  },
  {
    id: 3,
    title: '数据结构与算法',
    views: 8900,
    rating: 4.6
  },
  {
    id: 4,
    title: 'Java核心技术',
    views: 8500,
    rating: 4.5
  },
  {
    id: 5,
    title: 'React实战教程',
    views: 9800,
    rating: 4.9
  }
] 