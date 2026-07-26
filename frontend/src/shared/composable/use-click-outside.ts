import { onMounted, onUnmounted, type Ref } from 'vue'

type UseClickOutsideOptions = {
  targetRef: Ref<HTMLElement | null>
  ignoreRef?: Ref<HTMLElement | null>
  cb: () => void
}

export const useClickOutside = ({ targetRef, ignoreRef, cb }: UseClickOutsideOptions) => {
  const handlePointerDown = (event: PointerEvent) => {
    const target = event.target

    if (!(target instanceof Node)) return

    if (ignoreRef?.value?.contains(target)) return

    if (targetRef.value && !targetRef.value.contains(target)) {
      cb()
    }
  }

  onMounted(() => {
    document.addEventListener('pointerdown', handlePointerDown)
  })

  onUnmounted(() => {
    document.removeEventListener('pointerdown', handlePointerDown)
  })
}
