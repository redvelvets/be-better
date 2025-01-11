<template>
  <n-message-provider>
    <div class="app-container">
      <NavBar />
      <router-view></router-view>
    </div>
  </n-message-provider>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<style>
.app-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
