<template>
  <div class="dropdown" ref="containerRef">
    <div class="dropdown-header" @click="toggle">
      <slot name="trigger" />
    </div>
    <div
      class="dropdown-body-wrapper"
      :class="[direction ? `dropdown-${direction}` : 'dropdown-left']"
    >
      <Transition name="dropdown">
        <div class="dropdown-body" v-if="isOpen">
          <div class="dropdown-content">
            <slot name="content" :close="close" />
          </div>
          <UiDivider />
          <div v-if="$slots.footer" class="dropdown-footer">
            <slot name="footer" :close="close" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisclosure } from '@/shared/composable/use-disclosure.ts'
import UiDivider from '@/shared/ui/UiDivider.vue'
import { useClickOutside } from '@/shared/composable'
import { ref } from 'vue'

const { isOpen, toggle, close } = useDisclosure()

defineProps<{
  direction?: 'left' | 'right' | 'center'
}>()

const containerRef = ref<HTMLDivElement | null>(null)

useClickOutside({ targetRef: containerRef, cb: close })
</script>

<style scoped>
.dropdown {
  position: relative;
}
.dropdown-body-wrapper {
  position: absolute;
}
.dropdown-body {
  min-width: 250px;

  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  box-shadow: var(--shadow-md);

  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 10px;
}
.dropdown-left {
  right: 0;
}
.dropdown-right {
  left: 0;
}
.dropdown-center {
  left: 50%;
  transform: translateX(-50%);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 180ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: top right;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.96);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
