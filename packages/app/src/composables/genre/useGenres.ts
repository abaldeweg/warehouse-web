import { computed, ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { UseGenres } from '@/types/composables'
import type { Genre } from '@/types/model/genre'

/**
 * useGenres composable for genre logic.
 */
export function useGenres(): UseGenres {
  const genres = ref<Genre[] | null>(null)
  const criteria = ref<string | null>(null)
  const sort = ref<'asc' | 'desc' | null>(null)
  const isLoading = ref<boolean>(false)

  const processedGenres = computed<Genre[] | null>((): Genre[] | null => {
    if (!genres.value) return null
    let result: Genre[] = genres.value
    if (criteria.value) {
      const needle = criteria.value.toLowerCase().trim()
      result = genres.value.filter((g) => g.name.toLowerCase().includes(needle))
    }
    if (!sort.value) return result
    const sorted = [...result].sort((a, b) => a.name.localeCompare(b.name))
    return sort.value === 'asc' ? sorted : sorted.reverse()
  })

  const counter = computed(() => {
    if (!genres.value) return 0
    return genres.value.length
  })

  /**
   * Fetch genres from the API and update the genres ref.
   */
  const fetchGenres = async (): Promise<void> => {
    isLoading.value = true
    const response = await apiClient.get(`/api/genre`)
    genres.value = response.data
    isLoading.value = false
  }

  return {
    genres,
    criteria,
    sort,
    isLoading,
    processedGenres,
    counter,
    fetchGenres,
  }
}
