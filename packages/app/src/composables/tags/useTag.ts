import { apiClient } from '@/api/apiClient'
import { ref } from 'vue'
import type { Ref } from 'vue'

interface UseTag {
  deleteSuccess: Ref<boolean>
  deleteError: Ref<boolean>
  createTag: (name: string) => Promise<number>
  updateTag: (id: number, name: string) => Promise<void>
  removeTag: (id: number) => Promise<void>
}

/**
 * useTag composable for single tag management logic.
 */
export function useTag(): UseTag {
  const deleteSuccess = ref<boolean>(false)
  const deleteError = ref<boolean>(false)

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
    try {
      await apiClient.delete('/api/tag/' + id)
      deleteSuccess.value = true
    } catch {
      deleteError.value = true
    }
  }

  return {
    deleteSuccess,
    deleteError,
    createTag,
    updateTag,
    removeTag,
  }
}
