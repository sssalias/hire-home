<template>
  <UiButton @click="switchTheme" variant="ghost" icon-only>
    <Transition name="theme-icon" mode="out-in">
      <component :is="theme === 'light' ? MoonStar : SunMedium" :key="theme" />
    </Transition>
  </UiButton>
</template>

<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import { MoonStar, SunMedium } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const theme = ref<'light' | 'dark'>('light')

watch(theme, (value) => {
  document.documentElement.dataset.theme = value
})

const switchTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition:
    opacity 0.1s ease,
    transform 0.1s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}
</style>
