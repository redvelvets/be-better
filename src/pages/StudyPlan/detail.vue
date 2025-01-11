<template>
  <div class="container">
    <div class="content">
      <div class="header-section">
        <n-page-header
          @back="handleBack"
          :title="currentPlan?.title"
          :subtitle="`完成进度: ${currentPlan?.progress}%`"
        >
          <template #extra>
            <n-space>
              <n-button type="primary" @click="handleSave">
                保存进度
              </n-button>
            </n-space>
          </template>
        </n-page-header>
      </div>

      <div class="plan-cards">
        <n-grid :x-gap="16" :y-gap="16" cols="5" responsive="screen">
          <n-grid-item v-for="day in currentPlan?.days" :key="day.day">
            <n-card
              class="day-card"
              :class="{ completed: day.completed }"
              hoverable
              @click="showDayDetail(day)"
            >
              <div class="card-bg" :style="getCardBgStyle(day.day)">
                <div class="card-title">{{ day.title }}</div>
              </div>
              <div class="card-footer">
                <div class="day-info">
                  <span class="day-number">第{{ day.day }}天</span>
                  <div class="checkbox-wrapper">
                    <n-checkbox 
                      v-model:checked="day.completed" 
                      @click.stop
                      @update:checked="handleCheck(day)"
                    />
                    <div class="checkbox-animation" :class="{ 'animate': day.completed }">
                      <div class="circle"></div>
                      <div class="check-icon"></div>
                      <div class="sparkles">
                        <div class="spark" v-for="n in 8" :key="n" :style="{ '--i': n }"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="action-buttons">
                  <n-button text size="small" class="note-btn">
                    <template #icon>
                      <n-icon><DocumentTextOutline /></n-icon>
                    </template>
                    记笔记
                  </n-button>
                  <n-button text size="small" class="task-btn">
                    <template #icon>
                      <n-icon><CheckmarkCircleOutline /></n-icon>
                    </template>
                    今日任务
                  </n-button>
                </div>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </div>

    <!-- 学习内容详情模态框 -->
    <n-modal
      v-model:show="showDetailModal"
      preset="card"
      style="width: 600px"
      :title="`Day ${selectedDay?.day} 学习内容`"
    >
      <n-descriptions :column="1" bordered>
        <n-descriptions-item label="学习目标">
          {{ selectedDay?.title }}
        </n-descriptions-item>
        <n-descriptions-item label="完成状态">
          <n-tag :type="selectedDay?.completed ? 'success' : 'warning'">
            {{ selectedDay?.completed ? '已完成' : '未完成' }}
          </n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { DocumentTextOutline, CheckmarkCircleOutline } from '@vicons/ionicons5'
import confetti from 'canvas-confetti'

const route = useRoute()
const router = useRouter()
const message = useMessage()

const currentPlan = ref<any>(null)
const showDetailModal = ref(false)
const selectedDay = ref<any>(null)

// 获取卡片背景渐变色
const getCardBgStyle = (day: number) => {
  const gradients = [
    'linear-gradient(45deg, #4481eb, #04befe)',
    'linear-gradient(45deg, #b721ff, #21d4fd)',
    'linear-gradient(45deg, #3eecac, #ee74e1)',
    'linear-gradient(45deg, #fa709a, #fee140)',
    'linear-gradient(45deg, #00c6fb, #005bea)'
  ]
  return {
    background: gradients[(day - 1) % gradients.length]
  }
}

onMounted(() => {
  // 模拟从API获取数据
  const planId = Number(route.params.id)
  currentPlan.value = {
    id: planId,
    title: 'Python基础入门',
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
})

const handleBack = () => {
  router.push('/study-plan')
}

const handleSave = () => {
  // 计算进度
  const totalDays = currentPlan.value.days.length
  const completedDays = currentPlan.value.days.filter((d: any) => d.completed).length
  currentPlan.value.progress = Math.round((completedDays / totalDays) * 100)
  
  message.success('进度已保存')
}

const showDayDetail = (day: any) => {
  selectedDay.value = day
  showDetailModal.value = true
}

const handleCheck = (day: any) => {
  if (day.completed) {
    // 播放完成音效
    const audio = new Audio('/complete.mp3')
    audio.volume = 0.2
    audio.play().catch(() => {})

    // 显示成功消息
    message.success('太棒了！完成了今天的学习任务 🎉')

    // 触发五彩纸屑效果
    fireConfetti()
  }
}

// 五彩纸屑效果
const fireConfetti = () => {
  // 左侧彩带
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.2, y: 0.8 },
    colors: ['#1890ff', '#52c41a', '#722ed1', '#faad14', '#f5222d']
  })

  // 右侧彩带
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.8, y: 0.8 },
    colors: ['#1890ff', '#52c41a', '#722ed1', '#faad14', '#f5222d']
  })

  // 中间的星星
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { x: 0.5, y: 0.7 },
      shapes: ['star'],
      colors: ['#FFD700', '#FFA500', '#ff4d4f']
    })
  }, 200)

  // 随机彩带
  const end = Date.now() + 1000

  const colors = ['#1890ff', '#52c41a', '#722ed1', '#faad14', '#f5222d']

  ;(function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors
    })

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}

// 添加完成所有任务的检查
const checkAllCompleted = () => {
  if (!currentPlan.value?.days) return
  
  const allCompleted = currentPlan.value.days.every((day: any) => day.completed)
  if (allCompleted) {
    setTimeout(() => {
      message.success('恭喜你完成了所有学习任务！🎉🎉🎉', {
        duration: 5000,
        icon: () => h('span', { style: 'font-size: 24px;' }, '🏆')
      })
      
      // 特殊的完成效果
      const duration = 15 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        
        // 随机散射五彩纸屑
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      }, 250)
    }, 500)
  }
}

// 在每次勾选时检查是否完成所有任务
watch(
  () => currentPlan.value?.days,
  () => checkAllCompleted(),
  { deep: true }
)
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-section {
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  padding: 1rem;
}

.plan-cards {
  margin-top: 2rem;
}

.day-card {
  border: none;
  border-radius: 8px;
  overflow: hidden;
}

.card-bg {
  height: 120px;
  padding: 1rem;
  color: white;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 500;
}

.card-footer {
  padding: 0.8rem;
}

.day-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.day-number {
  font-size: 0.9rem;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.note-btn, .task-btn {
  font-size: 0.8rem;
  color: #666;
}

.note-btn:hover, .task-btn:hover {
  color: #1890ff;
}

.checkbox-wrapper {
  position: relative;
}

.checkbox-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 30px;
  height: 30px;
  background: rgba(24, 144, 255, 0.1);
  border-radius: 50%;
}

.check-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #1890ff;
}

.sparkles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
}

.spark {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 10px;
  background: #1890ff;
  border-radius: 2px;
  transform-origin: 50% 20px;
  opacity: 0;
  --rotation: calc(360deg / 8 * var(--i));
}

.checkbox-animation.animate .circle {
  animation: circle-expand 0.4s ease-out forwards;
}

.checkbox-animation.animate .check-icon {
  animation: check-appear 0.4s ease-out 0.1s forwards;
}

.checkbox-animation.animate .spark {
  animation: spark-rotate 0.5s ease-out forwards;
  animation-delay: calc(0.02s * var(--i));
}

@keyframes circle-expand {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

@keyframes check-appear {
  0% {
    transform: translate(-50%, -50%) scale(0) rotate(-45deg);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
    opacity: 0;
  }
}

@keyframes spark-rotate {
  0% {
    transform: rotate(var(--rotation)) translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    transform: rotate(var(--rotation)) translateY(-20px) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(var(--rotation)) translateY(-40px) scale(0);
    opacity: 0;
  }
}

/* 优化卡片完成状态的过渡效果 */
.day-card {
  transition: all 0.3s ease;
}

.day-card.completed {
  background-color: rgba(82, 196, 26, 0.05);
  animation: card-complete 0.5s ease-out;
}

.day-card.completed .card-bg {
  filter: saturate(0.8) brightness(1.1);
  transition: all 0.3s ease;
}

.day-card.completed .card-title {
  text-decoration: line-through;
  opacity: 0.8;
  transition: all 0.3s ease;
}

@keyframes card-complete {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* 让卡片在完成时有一个轻微的上浮效果 */
.day-card.completed:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
}
</style> 