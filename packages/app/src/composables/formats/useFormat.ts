import { apiClient } from '@/api/apiClient'
import type { UseFormat } from '../../types/composables'

/**
 * useFormat composable for single format management logic.
 */
export function useFormat(): UseFormat {
  const createFormat = async (name: string): Promise<number> => {
    const response = await apiClient.post('/api/format/new', { name })
    return response.data.id
  }

  const updateFormat = async (id: number, name: string): Promise<void> => {
    await apiClient.put('/api/format/' + id, { name })
  }

  const removeFormat = async (id: number): Promise<void> => {
    await apiClient.delete('/api/format/' + id)
  }

  return {
    createFormat,
    updateFormat,
    removeFormat,
  }
}
