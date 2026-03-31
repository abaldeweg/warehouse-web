import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { UseFormats } from '@/types/composables'
import type { Format } from '@/types/model/format'

/**
 * useFormats composable for managing a list of formats.
 */
export function useFormats(): UseFormats {
  const formats = ref<Format[] | null>(null)

  const listFormats = async (): Promise<void> => {
    const response = await apiClient.get('/api/format/')
    formats.value = response.data
  }

  return {
    formats,
    listFormats,
  }
}
