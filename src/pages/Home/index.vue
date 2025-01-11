<template>
  <div class="container">
    <div class="content">
      <div class="carousel-section">
        <n-carousel
          autoplay
          show-dots="always"
          dot-type="line"
          effect="fade"
          :interval="4000"
          :show-arrow="true"
        >
          <n-carousel-item v-for="item in carouselData" :key="item.id">
            <div class="carousel-item">
              <img :src="item.imageUrl" :alt="item.title">
              <div class="carousel-text">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <n-button type="primary" size="large" class="carousel-btn">
                  立即学习
                </n-button>
              </div>
            </div>
          </n-carousel-item>
        </n-carousel>
      </div>

      <div class="ranking-section">
        <n-card class="ranking-card" :bordered="false">
          <template #header>
            <div class="card-header">
              <AppIcon :icon="TrophyOutline" :size="24" color="#1890ff" />
              <span class="header-text">课程排行榜</span>
            </div>
          </template>
          <n-list hoverable clickable>
            <n-list-item v-for="(item, index) in rankingData" :key="item.id">
              <n-thing>
                <template #header>
                  <div class="ranking-item">
                    <n-tag round type="primary" size="large" class="rank-number" :bordered="false">
                      {{ index + 1 }}
                    </n-tag>
                    <span class="rank-title">{{ item.title }}</span>
                  </div>
                </template>
                <template #description>
                  <div class="rank-info">
                    <span class="rank-views">
                      <AppIcon :icon="TimeOutline" :size="16" />
                      {{ item.views }}次学习
                    </span>
                    <n-rate readonly size="small" :value="item.rating" />
                  </div>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BookOutline, HomeOutline, ListOutline, StarOutline, TimeOutline, TrophyOutline } from '@vicons/ionicons5'
import AppIcon from '../../components/AppIcon.vue'
import { carouselData, rankingData } from '../../mock/homeData'
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.content {
  display: flex;
  padding: 2rem;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.carousel-section {
  flex: 2;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.carousel-item {
  position: relative;
  height: 450px;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
}

.carousel-text h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.carousel-text p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.carousel-btn {
  padding: 0.5rem 2rem;
}

.ranking-section {
  flex: 1;
  min-width: 300px;
}

.ranking-card {
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.header-text {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.rank-number {
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-title {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.rank-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.rank-views {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 1200px) {
  .content {
    flex-direction: column;
  }
  
  .ranking-section {
    min-width: 100%;
  }
}
</style> 