import { apiClient } from '@/api/apiClient'
import { ref } from 'vue'
import type { Ref } from 'vue'

interface UseFormat {
  deleteSuccess: Ref<boolean>
  deleteError: Ref<boolean>
  createFormat: (name: string) => Promise<number>
  updateFormat: (id: number, name: string) => Promise<void>
  removeFormat: (id: number) => Promise<void>
}

/**
 * useFormat composable for single format management logic.
 */
export function useFormat(): UseFormat {
  const deleteSuccess = ref<boolean>(false)
  const deleteError = ref<boolean>(false)

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
    try {
      await apiClient.delete('/api/format/' + id)
      deleteSuccess.value = true
    } catch {
      deleteError.value = true
    }
  }

  return {
    deleteSuccess,
    deleteError,
    createFormat,
    updateFormat,
    removeFormat,
  }
}
