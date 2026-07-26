<template>
  <div class="field-wrapper">
    <label class="field-label">
      <span class="field-label-text">{{ label }}</span>
      <input
        class="field"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="attrs"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  modelValue?: string
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const attrs = useAttrs()
</script>

<style scoped>
.field {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  text-decoration: none;
  outline: none;

  padding: 10px 15px;
  font-size: var(--font-size-md);

  background-color: var(--color-surface);

  color: var(--color-text-primary);
}
.field-label {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field-label-text {
  color: var(--color-text-secondary);
}
</style>
