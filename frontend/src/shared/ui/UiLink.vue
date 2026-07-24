<template>
  <RouterLink class="link" :to="path">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  path: string
}>()
</script>

<style scoped>
.link {
  color: var(--color-primary);
}
</style>
