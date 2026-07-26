<template>
  <UiModal :title="confirmMessage" :is-open="isOpen" :close="close" hideCross>
    <div class="confirm-button-group">
      <UiButton @click="onClose" variant="secondary" size="sm">Да</UiButton>
      <UiButton @click="close" variant="danger" size="sm">Отмена</UiButton>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '@/shared/ui/UiModal.vue'
import { computed } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'

const { message, cb, close } = defineProps<{
  message: string
  isOpen: boolean
  close: () => void
  cb: () => void
}>()

const confirmMessage = computed(() => `Вы уверены, что хотите ${message}?`)

const onClose = () => {
  cb()
  close()
}
</script>

<style scoped>
.confirm-button-group {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);
}
</style>
