<template>
  <div class="container">
    <div class="content">
      <div class="header-section">
        <h1>我的学习计划</h1>
        <p>追踪你的学习进度，保持学习动力</p>
      </div>

      <n-card :bordered="false" class="table-card">
        <n-data-table
          :columns="columns"
          :data="myPlanList"
          :bordered="false"
          :single-line="false"
          :row-class-name="rowClassName"
        />
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import { NTag, NProgress, NButton, NSpace } from 'naive-ui'
import type { MyPlan } from '@/mock/types'
import { getMyPlans } from '@/utils/service'

const columns = [
  {
    title: '课程名称',
    key: 'title',
    render(row: any) {
      return h('div', { class: 'course-title' }, row.title)
    }
  },
  {
    title: '开始时间',
    key: 'startDate'
  },
  {
    title: '学习进度',
    key: 'progress',
    render(row: any) {
      return h(NProgress, {
        type: 'line',
        percentage: row.progress,
        indicatorPlacement: 'inside',
        processing: row.status === '进行中',
        height: 20
      })
    }
  },
  {
    title: '状态',
    key: 'status',
    render(row: any) {
      return h(
        NTag,
        {
          type: row.status === '已完成' ? 'success' : 'info',
          round: true,
          bordered: false
        },
        { default: () => row.status }
      )
    }
  },
  {
    title: '操作',
    key: 'actions',
    render() {
      return h(
        NSpace,
        { justify: 'center' },
        {
          default: () => [
            h(
              NButton,
              {
                type: 'primary',
                secondary: true,
                size: 'small'
              },
              { default: () => '继续学习' }
            ),
            h(
              NButton,
              {
                type: 'error',
                secondary: true,
                size: 'small'
              },
              { default: () => '删除' }
            )
          ]
        }
      )
    }
  }
]

const myPlanList = ref<MyPlan[]>([])

onMounted(async () => {
  myPlanList.value = await getMyPlans()
})

const rowClassName = (row: any) => {
  return row.status === '已完成' ? 'completed-row' : ''
}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.header-section h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.header-section p {
  font-size: 1.1rem;
  color: #666;
}

.table-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.course-title {
  font-weight: 500;
  color: #333;
}

:deep(.completed-row) {
  background-color: rgba(0, 128, 0, 0.05);
}

@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }
  
  .header-section h1 {
    font-size: 2rem;
  }
}
</style> 