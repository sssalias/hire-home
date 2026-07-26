<template>
  <button
    class="button"
    v-bind="attrs"
    :class="[
      `button-${variant}`,
      `button-${size}`,
      {
        'button-icon': icon,
        'button-icon-only': iconOnly,
        'button-full': full,
        'button-animated': isAnimated,
      },
    ]"
    @click="triggerAnimation"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    icon?: boolean
    iconOnly?: boolean
    full?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    icon: false,
    iconOnly: false,
    full: false,
  },
)

const attrs = useAttrs()

const isAnimated = ref(false)

const triggerAnimation = () => {
  if (isAnimated.value) return

  isAnimated.value = true

  setTimeout(() => {
    isAnimated.value = false
  }, 200)
}
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  border: none;
  cursor: pointer;

  border-radius: var(--radius-md);

  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast),
    opacity var(--transition-fast);

  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-animated {
  animation: click-button-animation 0.2s;
}

/* Variants */

.button-primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.button-primary:hover {
  background: var(--color-primary-hover);
}

.button-primary:active {
  background: var(--color-primary-active);
}

.button-secondary {
  background: var(--color-surface-secondary);
  color: var(--color-text-primary);
}

.button-secondary:hover {
  background: var(--color-border);
}

.button-danger {
  background: var(--color-danger);
  color: var(--color-text-inverse);
}

.button-danger:hover {
  filter: brightness(0.95);
}

.button-ghost {
  background: transparent;
  color: var(--color-text-primary);
}

.button-ghost:hover {
  background: var(--color-surface-secondary);
}

/* Sizes */

.button-sm {
  min-height: 32px;
  padding: 0 12px;
  font-size: var(--font-size-sm);
}

.button-md {
  min-height: 40px;
  padding: 0 16px;
  font-size: var(--font-size-md);
}

.button-lg {
  min-height: 48px;
  padding: 0 20px;
  font-size: var(--font-size-lg);
}

/* Icon */

.button-icon {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.button-icon-only {
  padding: 0;
  border-radius: var(--radius-full);
  aspect-ratio: 1;
}

.button-icon-only.button-sm {
  width: 32px;
}

.button-icon-only.button-md {
  width: 40px;
}

.button-icon-only.button-lg {
  width: 48px;
}

/* Full */

.button-full {
  width: 100%;
}

@keyframes click-button-animation {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}
</style>
