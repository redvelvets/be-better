<template>
  <n-icon :size="size" :color="color" :depth="depth">
    <component :is="icon" />
  </n-icon>
</template>

<script setup lang="ts">
import { BookOutline, HomeOutline, ListOutline, StarOutline, TimeOutline, TrophyOutline } from '@vicons/ionicons5'

defineProps<{
  icon: any,
  size?: number,
  color?: string,
  depth?: number
}>()
</script> 