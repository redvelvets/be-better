<template>
  <div class="container">
    <div class="content">
      <div class="bookshelf">
        <div v-if="studyPlanList.length === 0" class="empty-shelf">
          <n-empty>
            <template #extra>
              <n-button type="primary" size="large" @click="showAddPlanModal = true">
                <template #icon>
                  <n-icon><AddOutline /></n-icon>
                </template>
                创建学习计划
              </n-button>
            </template>
          </n-empty>
        </div>
        
        <div v-else class="books-container">
          <div
            v-for="plan in studyPlanList"
            :key="plan.id"
            class="book"
            @click="goToPlanDetail(plan.id)"
          >
            <div class="book-cover" :style="{ background: getGradientColor(plan.id) }">
              <div class="book-spine"></div>
              <div class="book-content">
                <h3>{{ plan.title }}</h3>
                <p>{{ plan.description }}</p>
                <div class="book-progress">
                  <n-progress
                    type="line"
                    :percentage="plan.progress"
                    :height="6"
                    :border-radius="4"
                    :color="getProgressColor(plan.progress)"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div class="add-plan" @click="showAddPlanModal = true">
            <div class="add-plan-inner">
              <n-icon size="48" class="add-icon">
                <AddCircleOutline />
              </n-icon>
              <span>添加新计划</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加计划的模态框 -->
    <n-modal
      v-model:show="showAddPlanModal"
      preset="card"
      title="创建学习计划"
      style="width: 600px"
      :bordered="false"
    >
      <n-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        label-placement="left"
        label-width="100"
      >
        <n-form-item label="计划名称" path="title">
          <n-input v-model:value="formModel.title" placeholder="给你的学习计划起个名字" />
        </n-form-item>
        <n-form-item label="计划描述" path="description">
          <n-input
            v-model:value="formModel.description"
            type="textarea"
            placeholder="简单描述一下你的学习目标"
          />
        </n-form-item>
        <n-form-item label="学习天数" path="days">
          <n-input-number
            v-model:value="formModel.days"
            :min="1"
            :max="100"
            placeholder="预计需要多少天完成"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showAddPlanModal = false">取消</n-button>
          <n-button type="primary" @click="handleAddPlan">创建</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { AddOutline, AddCircleOutline } from '@vicons/ionicons5'
import type { StudyPlan } from '@/mock/types'
import { getStudyPlans } from '@/utils/service'

const router = useRouter()
const message = useMessage()

// 学习计划数据
const studyPlanList = ref<StudyPlan[]>([])

onMounted(async () => {
  studyPlanList.value = await getStudyPlans()
})

// 模态框控制
const showAddPlanModal = ref(false)
const formRef = ref<any>(null)
const formModel = ref({
  title: '',
  description: '',
  days: 7
})

// 表单验证规则
const rules = {
  title: {
    required: true,
    message: '请输入计划名称',
    trigger: 'blur'
  },
  description: {
    required: true,
    message: '请输入计划描述',
    trigger: 'blur'
  },
  days: {
    required: true,
    message: '请输入学习天数',
    trigger: 'blur'
  }
}

// 添加计划
const handleAddPlan = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      const newPlan = {
        id: Date.now(),
        title: formModel.value.title,
        description: formModel.value.description,
        progress: 0,
        color: getRandomColor(),
        days: Array.from({ length: formModel.value.days }, (_, i) => ({
          day: i + 1,
          title: `第${i + 1}天学习内容`,
          completed: false
        }))
      }
      studyPlanList.value.push(newPlan)
      showAddPlanModal.value = false
      message.success('添加成功')
      formModel.value = {
        title: '',
        description: '',
        days: 7
      }
    }
  })
}

// 生成随机颜色
const getRandomColor = () => {
  const colors = ['#1890ff', '#52c41a', '#faad14', '#722ed1', '#eb2f96']
  return colors[Math.floor(Math.random() * colors.length)]
}

// 跳转到计划详情
const goToPlanDetail = (planId: number) => {
  router.push(`/study-plan/${planId}`)
}

// 获取渐变背景色
const getGradientColor = (id: number) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
    'linear-gradient(135deg, #b721ff 0%, #21d4fd 100%)',
    'linear-gradient(135deg, #fff720 0%, #3cd500 100%)',
    'linear-gradient(135deg, #ff6b6b 0%, #556270 100%)'
  ]
  return gradients[id % gradients.length]
}

// 获取进度条颜色
const getProgressColor = (progress: number) => {
  if (progress >= 80) return '#52c41a'
  if (progress >= 50) return '#1890ff'
  return '#ff4d4f'
}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.bookshelf {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  min-height: 500px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.empty-shelf {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.books-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.book {
  cursor: pointer;
  perspective: 1000px;
  height: 320px;
}

.book-cover {
  position: relative;
  height: 100%;
  border-radius: 12px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.book:hover .book-cover {
  transform: rotateY(-15deg);
}

.book-spine {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: rgba(0,0,0,0.1);
  border-radius: 12px 0 0 12px;
}

.book-content {
  padding: 2rem 2rem 2rem 4rem;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
}

.book-content h3 {
  font-size: 1.5rem;
  margin: 0 0 1rem;
}

.book-content p {
  flex: 1;
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.6;
}

.book-progress {
  margin-top: 1rem;
}

.add-plan {
  height: 320px;
  cursor: pointer;
}

.add-plan-inner {
  height: 100%;
  border: 2px dashed #e8e8e8;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #999;
  transition: all 0.3s;
}

.add-plan-inner:hover {
  border-color: #1890ff;
  color: #1890ff;
  background: rgba(24,144,255,0.02);
}

.add-icon {
  transition: transform 0.3s;
}

.add-plan:hover .add-icon {
  transform: rotate(90deg);
}
</style> 