import request from './request'
import type { CarouselItem, RankingItem, StudyPlan, MyPlan } from '@/mock/types'
import type { AxiosResponse } from 'axios'

interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

// 首页接口
export const homeApi = {
  getCarouselList(): Promise<AxiosResponse<ApiResponse<CarouselItem[]>>> {
    return request.get('/home/carousel')
  },
  getRankingList(): Promise<AxiosResponse<ApiResponse<RankingItem[]>>> {
    return request.get('/home/ranking')
  }
}

// 学习计划接口
export const studyPlanApi = {
  getPlanList(): Promise<AxiosResponse<ApiResponse<StudyPlan[]>>> {
    return request.get('/study-plan/list')
  },
  getPlanDetail(id: number): Promise<AxiosResponse<ApiResponse<StudyPlan>>> {
    return request.get(`/study-plan/${id}`)
  },
  createPlan(data: Partial<StudyPlan>): Promise<AxiosResponse<ApiResponse<StudyPlan>>> {
    return request.post('/study-plan', data)
  },
  updatePlan(id: number, data: Partial<StudyPlan>): Promise<AxiosResponse<ApiResponse<StudyPlan>>> {
    return request.put(`/study-plan/${id}`, data)
  }
}

// 我的计划接口
export const myPlanApi = {
  getMyPlans(): Promise<AxiosResponse<ApiResponse<MyPlan[]>>> {
    return request.get('/my-plan/list')
  }
} 