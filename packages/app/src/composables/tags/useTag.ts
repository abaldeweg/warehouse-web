import { apiClient } from '@/api/apiClient'
import type { UseTag } from '../../types/composables'

/**
 * useTag composable for single tag management logic.
 */
export function useTag(): UseTag {
  const createTag = async (name: string): Promise<number> => {
    const response = await apiClient.post('/api/tag/new', { name })
    return response.data.id
  }

  const updateTag = async (id: number, name: string): Promise<void> => {
    await apiClient.put('/api/tag/' + id, { name })
  }

  const removeTag = async (id: number): Promise<void> => {
    await apiClient.delete('/api/tag/' + id)
  }

  return {
    createTag,
    updateTag,
    removeTag,
  }
}
