import { apiClient } from '@/api/apiClient'
import type { UseTag } from '../../types/composables'

/**
 * useTag composable for single tag management logic.
 */
export function useTag(): UseTag {
  /**
   * Creates a new tag with the given name.
   */
  const createTag = async (name: string): Promise<number> => {
    const response = await apiClient.post('/api/tag/new', { name })
    return response.data.id
  }

  /**
   * Updates the name of an existing tag.
   */
  const updateTag = async (id: number, name: string): Promise<void> => {
    await apiClient.put('/api/tag/' + id, { name })
  }

  /**
   * Removes a tag by its ID.
   */
  const removeTag = async (id: number): Promise<void> => {
    await apiClient.delete('/api/tag/' + id)
  }

  return {
    createTag,
    updateTag,
    removeTag,
  }
}
