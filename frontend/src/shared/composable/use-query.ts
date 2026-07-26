import { type Ref, ref, shallowRef, type ShallowRef, watch, watchEffect } from 'vue'

export type QueryResult<T> = {
  data: ShallowRef<T | null>
  loading: Ref<boolean>
  error: Ref<unknown | null>
  refetch: () => Promise<void>
}

export type QueryParams<T> = {
  queryFunc: () => Promise<T>
}

export const useQuery = <T>({ queryFunc }: QueryParams<T>): QueryResult<T> => {
  const data = shallowRef<T | null>(null)
  const loading = ref<boolean>(true)
  const error = ref<unknown | null>(null)

  const execute = async () => {
    loading.value = true
    error.value = null

    try {
      data.value = await queryFunc()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  void execute()

  return {
    data,
    loading,
    error,
    refetch: execute,
  }
}
