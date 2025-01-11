export interface CarouselItem {
  id: number
  title: string
  imageUrl: string
  description: string
}

export interface RankingItem {
  id: number
  title: string
  views: number
  rating: number
}

export interface StudyPlan {
  id: number
  title: string
  description: string
  progress: number
  days: StudyPlanDay[]
}

export interface StudyPlanDay {
  day: number
  title: string
  completed: boolean
}

export interface MyPlan {
  id: number
  title: string
  startDate: string
  progress: number
  status: string
} 