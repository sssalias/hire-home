<template>
  <RouterLink class="link" :to="{ name: path }">
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
  outline: none;
  text-decoration: none;
}
</style>
