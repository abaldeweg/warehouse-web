import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { UseGenres } from '@/types/composables'
import type { Genre } from '@/types/model/genre'

/**
 * useGenres composable for genre logic.
 */
export function useGenres(): UseGenres {
  const genres = ref<Genre[] | null>(null)

  /**
   * Fetch genres from the API and update the genres ref.
   */
  const fetchGenres = async (): Promise<void> => {
    const response = await apiClient.get(`/api/genre`)
    genres.value = response.data
  }

  return {
    genres,
    fetchGenres,
  }
}
