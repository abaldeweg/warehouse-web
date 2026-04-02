import { computed, ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { UseFormats } from '@/types/composables'
import type { Format } from '@/types/model/format'

/**
 * useFormats composable for managing a list of formats.
 */
export function useFormats(): UseFormats {
  const formats = ref<Format[] | null>(null)

  const criteria = ref<string | null>(null)
  const filteredFormats = computed<Format[] | null>(() => {
    if (!formats.value) return null
    if (!criteria.value) return formats.value
    const needle = criteria.value.toLowerCase().trim()
    return formats.value.filter((f) => f.name.toLowerCase().includes(needle))
  })

  const listFormats = async (): Promise<void> => {
    const response = await apiClient.get('/api/format/')
    formats.value = response.data
  }

  return {
    formats,
    criteria,
    filteredFormats,
    listFormats,
  }
}
