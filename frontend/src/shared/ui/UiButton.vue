<template>
  <button
    class="button"
    v-bind="attrs"
    :class="[variant ? `button-${variant}` : 'button-primary', isAnimated ? 'button-animated' : '']"
    @click="triggerAnimation"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'

defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
}>()

const attrs = useAttrs()

const isAnimated = ref<boolean>(false)

const triggerAnimation = () => {
  if (isAnimated.value) return

  isAnimated.value = true

  setTimeout(() => {
    isAnimated.value = false
  }, 500)
}
</script>

<style scoped>
.button {
  padding: 10px 15px;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.button-animated {
  animation: click-button-animation 0.2s;
}

.button-primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-primary-active);
  }
}

.button-secondary {
  background-color: var(--color-surface-secondary);
  color: var(--color-text-primary);
}

.button-danger {
  background-color: var(--color-danger);
  color: var(--color-text-inverse);
}

@keyframes click-button-animation {
  0% {
    scale: 1;
  }

  50% {
    scale: 0.98;
  }

  100% {
    scale: 1;
  }
}
</style>
