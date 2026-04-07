import { apiClient } from '@/api/apiClient'
import type { UseGenre } from '@/types/composables'
import { ref } from 'vue'

/**
 * useGenre composable for single genre management logic.
 */
export function useGenre(): UseGenre {
  const deleteSuccess = ref<boolean>(false)
  const deleteError = ref<boolean>(false)

  /**
   * Creates a new genre with the given name.
   */
  const createGenre = async (name: string): Promise<number> => {
    const response = await apiClient.post('/api/genre/new', { name })
    return response.data.id
  }

  /**
   * Updates the name of an existing genre.
   */
  const updateGenre = async (id: number, name: string): Promise<void> => {
    await apiClient.put('/api/genre/' + id, { name })
  }

  /**
   * Removes a genre by its ID.
   */
  const removeGenre = async (id: number): Promise<void> => {
    try {
      await apiClient.delete('/api/genre/' + id)
      deleteSuccess.value = true
    } catch {
      deleteError.value = true
    }
  }

  return {
    deleteSuccess,
    deleteError,
    createGenre,
    updateGenre,
    removeGenre,
  }
}
