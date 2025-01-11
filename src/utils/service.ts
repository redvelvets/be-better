import * as apis from '@/api'
import { carouselData, rankingData, studyPlans, myPlans } from '@/mock'
import type { CarouselItem, RankingItem, StudyPlan, MyPlan } from '@/mock/types'

declare const __USE_MOCK__: boolean

// 根据环境决定使用 mock 数据还是 API
const useMock = __USE_MOCK__

export const getCarouselList = async (): Promise<CarouselItem[]> => {
  if (useMock) {
    return Promise.resolve(carouselData)
  }
  const response = await apis.homeApi.getCarouselList()
  return response.data.data
}

export const getRankingList = async (): Promise<RankingItem[]> => {
  if (useMock) {
    return Promise.resolve(rankingData)
  }
  const response = await apis.homeApi.getRankingList()
  return response.data.data
}

export const getStudyPlans = async (): Promise<StudyPlan[]> => {
  if (useMock) {
    return Promise.resolve(studyPlans)
  }
  const response = await apis.studyPlanApi.getPlanList()
  return response.data.data
}

export const getMyPlans = async (): Promise<MyPlan[]> => {
  if (useMock) {
    return Promise.resolve(myPlans)
  }
  const response = await apis.myPlanApi.getMyPlans()
  return response.data.data
} 