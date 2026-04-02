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
    const sort = ref<'asc' | 'desc' | null>(null)
    const processedFormats = computed<Format[] | null>((): Format[] | null => {
      if (!formats.value) return null
      let result: Format[] = formats.value
      if (criteria.value) {
        const needle = criteria.value.toLowerCase().trim()
        result = formats.value.filter((f) => f.name.toLowerCase().includes(needle))
      }
      if (!sort.value) return result
      const sorted = [...result].sort((a, b) => a.name.localeCompare(b.name))
      return sort.value === 'asc' ? sorted : sorted.reverse()
    })

  const listFormats = async (): Promise<void> => {
    const response = await apiClient.get('/api/format/')
    formats.value = response.data
  }

  return {
    formats,
    criteria,
    sort,
    processedFormats,
    listFormats,
  }
}
