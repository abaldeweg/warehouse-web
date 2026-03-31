import { apiClient } from '@/api/apiClient'
import type { UseGenre } from '../../types/composables'

/**
 * useGenre composable for single genre management logic.
 */
export function useGenre(): UseGenre {
  const createGenre = async (name: string): Promise<number> => {
    const response = await apiClient.post('/api/genre/new', { name })
    return response.data.id
  }

  const updateGenre = async (id: number, name: string): Promise<void> => {
    await apiClient.put('/api/genre/' + id, { name })
  }

  const removeGenre = async (id: number): Promise<void> => {
    await apiClient.delete('/api/genre/' + id)
  }

  return {
    createGenre,
    updateGenre,
    removeGenre,
  }
}
