<template>
  <nav class="navbar">
    <div class="nav-brand">
      <n-icon size="24" color="white">
        <BookOutline />
      </n-icon>
      <span class="brand-text">Be Better</span>
    </div>
    <div class="nav-links">
      <router-link to="/" class="nav-item">
        <n-icon size="18">
          <HomeOutline />
        </n-icon>
        首页
      </router-link>
      <router-link to="/study-plan" class="nav-item">
        <n-icon size="18">
          <ListOutline />
        </n-icon>
        学习计划
      </router-link>
      <router-link to="/my-plan" class="nav-item">
        <n-icon size="18">
          <StarOutline />
        </n-icon>
        我的计划
      </router-link>
    </div>
    <div class="user-section">
      <n-dropdown trigger="hover" :options="userOptions" @select="handleSelect">
        <div class="avatar-wrapper">
          <n-avatar round :size="32" src="https://picsum.photos/32" />
        </div>
      </n-dropdown>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { h } from 'vue'
// 只在实际使用路由跳转时才导入 useRouter
// import { useRouter } from 'vue-router'
import { BookOutline, HomeOutline, ListOutline, StarOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

// const router = useRouter()  // 暂时注释掉未使用的变量
const message = useMessage()

const userOptions = [
  {
    label: '登录',
    key: 'login',
    icon: () => h('i', { class: 'fas fa-sign-in-alt' })
  },
  {
    label: '注册',
    key: 'register',
    icon: () => h('i', { class: 'fas fa-user-plus' })
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h('i', { class: 'fas fa-sign-out-alt' })
  }
]

const handleSelect = (key: string) => {
  switch (key) {
    case 'login':
      message.info('跳转到登录页面')
      // router.push('/login')
      break
    case 'register':
      message.info('跳转到注册页面')
      // router.push('/register')
      break
    case 'logout':
      message.success('已退出登录')
      break
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 0.5rem 2rem;
  background: linear-gradient(90deg, #00b09b, #96c93d);
  color: white;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-text {
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  margin-left: 3rem;
  gap: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.user-section {
  margin-left: auto;
}

.avatar-wrapper {
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  transition: all 0.3s;
}

.avatar-wrapper:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style> 