import { computed, ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Format } from '@/types/model/format'
import type { Ref } from 'vue'

interface UseFormats {
  formats: Ref<Format[] | null>
  criteria: Ref<string | null>
  sort: Ref<'asc' | 'desc' | null>
  isLoading: Ref<boolean>
  readonly processedFormats: Ref<Format[] | null>
  counter: Ref<number>
  listFormats: () => Promise<void>
}

/**
 * useFormats composable for managing a list of formats.
 */
export function useFormats(): UseFormats {
  const formats = ref<Format[] | null>(null)
  const criteria = ref<string | null>(null)
  const sort = ref<'asc' | 'desc' | null>(null)
  const isLoading = ref<boolean>(false)

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

  const counter = computed(() => {
    if (!formats.value) return 0
    return formats.value.length
  })

  /**
   * Fetches the list of formats from the API and updates the `formats` ref.
   */
  const listFormats = async (): Promise<void> => {
    isLoading.value = true
    const response = await apiClient.get('/api/format/')
    formats.value = response.data
    isLoading.value = false
  }

  return {
    formats,
    criteria,
    sort,
    isLoading,
    processedFormats,
    counter,
    listFormats,
  }
}
