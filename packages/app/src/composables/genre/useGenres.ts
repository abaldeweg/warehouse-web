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
  const filteredGenres = computed<Genre[] | null>(() => {
    if (!genres.value) return null
    if (!criteria.value) return genres.value
    const needle = criteria.value.toLowerCase().trim()
    return genres.value.filter((g) => g.name.toLowerCase().includes(needle))
  })

  /**
   * Fetch genres from the API and update the genres ref.
   */
  const fetchGenres = async (): Promise<void> => {
    const response = await apiClient.get(`/api/genre`)
    genres.value = response.data
  }

  return {
    genres,
    criteria,
    filteredGenres,
    fetchGenres,
  }
}
