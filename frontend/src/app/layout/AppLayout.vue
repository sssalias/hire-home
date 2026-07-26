<template>
  <AppHeader />
  <main class="main">
    <UiContainer class="main-container">
      <h1 class="view-title">{{ title }}</h1>
      <RouterView />
    </UiContainer>
  </main>
</template>

<script setup lang="ts">
import { UiContainer } from '@/shared/ui'
import { AppHeader } from '@/app/layout/components'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const title = computed(() => route.meta.title)
</script>
сду

<style scoped>
.main {
  min-height: 100vh;
  width: 100%;
  padding-top: var(--space-8);
  background-color: var(--color-surface);
}
.main-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}
.view-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}
</style>
