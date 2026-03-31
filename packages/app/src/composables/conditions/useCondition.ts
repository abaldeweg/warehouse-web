import { apiClient } from '@/api/apiClient'
import type { UseCondition } from '../../types/composables'

/**
 * useCondition composable for single condition management logic.
 */
export function useCondition(): UseCondition {
  const createCondition = async (name: string): Promise<number> => {
    const response = await apiClient.post('/api/condition/new', { name })
    return response.data.id
  }

  const updateCondition = async (id: number, name: string): Promise<void> => {
    await apiClient.put('/api/condition/' + id, { name })
  }

  const removeCondition = async (id: number): Promise<void> => {
    await apiClient.delete('/api/condition/' + id)
  }

  return {
    createCondition,
    updateCondition,
    removeCondition,
  }
}
