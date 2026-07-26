<template>
  <Teleport to="body">
    <Transition name="modal">
      <div class="modal-wrapper" v-show="isOpen" @click="close">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <UiButton v-show="!hideCross" @click="close" variant="ghost" icon-only>
              <X />
            </UiButton>
          </div>
          <div class="modal-content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import { X } from 'lucide-vue-next'

const { isOpen, close } = defineProps<{
  isOpen: boolean
  close: () => void
  title: string
  hideCross?: boolean
}>()

watch(
  () => isOpen,
  (value) => {
    if (value) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  },
)

onMounted(() => {})
</script>

<style scoped>
.modal-wrapper {
  background: rgba(15, 23, 42, 0.28);
  z-index: var(--z-modal);
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(14px);
}

.modal-container {
  background-color: var(--color-surface-secondary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 25px;

  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-md);
}

.modal-title {
  font-weight: var(--font-weight-normal);
  color: var(--color-text-primary);
}

.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 180ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: top right;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>
