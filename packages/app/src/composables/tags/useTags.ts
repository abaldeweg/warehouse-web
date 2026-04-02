import { ref, computed } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Tag } from '@/types/model/tag'
import type { UseTags } from '@/types/composables'

/**
 * useTags composable for managing a list of tags.
 */
export function useTags(): UseTags {
  const tags = ref<Tag[] | null>(null)

  const criteria = ref<string | null>(null)
  const filteredTags = computed<Tag[] | null>(() => {
    if (!tags.value) return null
    if (!criteria.value) return tags.value
    const needle = criteria.value.toLowerCase().trim()
    return tags.value.filter((t) => t.name.toLowerCase().includes(needle))
  })

  const listTags = async (): Promise<void> => {
    const response = await apiClient.get('/api/tag/')
    tags.value = response.data
  }

  return {
    tags,
    criteria,
    filteredTags,
    listTags,
  }
}
