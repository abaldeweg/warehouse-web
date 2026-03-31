import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Tag } from '@/types/model/tag'
import type { UseTags } from '@/types/composables'

/**
 * useTags composable for managing a list of tags.
 */
export function useTags(): UseTags {
  const tags = ref<Tag[] | null>(null)

  const listTags = async (): Promise<void> => {
    const response = await apiClient.get('/api/tag/')
    tags.value = response.data
  }

  return {
    tags,
    listTags,
  }
}
