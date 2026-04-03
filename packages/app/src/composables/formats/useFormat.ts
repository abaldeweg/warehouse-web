import { apiClient } from '@/api/apiClient'
import type { UseFormat } from '../../types/composables'

/**
 * useFormat composable for single format management logic.
 */
export function useFormat(): UseFormat {
  /**
   * Creates a new format with the given name.
   */
  const createFormat = async (name: string): Promise<number> => {
    const response = await apiClient.post('/api/format/new', { name })
    return response.data.id
  }

  /**
   * Updates the name of an existing format.
   */
  const updateFormat = async (id: number, name: string): Promise<void> => {
    await apiClient.put('/api/format/' + id, { name })
  }

  /**
   * Removes a format by its ID.
   */
  const removeFormat = async (id: number): Promise<void> => {
    await apiClient.delete('/api/format/' + id)
  }

  return {
    createFormat,
    updateFormat,
    removeFormat,
  }
}
