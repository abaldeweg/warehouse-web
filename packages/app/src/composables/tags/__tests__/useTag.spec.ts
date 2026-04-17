import { describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'
import { useTag } from '@/composables/tags/useTag'
import { apiClient } from '@/api/apiClient'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('useTag', () => {
  it('creates a tag and returns id', async () => {
    ; (apiClient.post as unknown as Mock).mockResolvedValue({ data: { id: 1 } })
    const { createTag } = useTag()
    const id = await createTag('new')
    expect(id).toBe(1)
    expect(apiClient.post).toHaveBeenCalledWith('/api/tag/new', { name: 'new' })
  })

  it('updates a tag', async () => {
    ; (apiClient.put as unknown as Mock).mockResolvedValue({})
    const { updateTag } = useTag()
    await updateTag(2, 'updated')
    expect(apiClient.put).toHaveBeenCalledWith('/api/tag/2', { name: 'updated' })
  })

  it('removes a tag and sets success flag', async () => {
    const { removeTag, deleteSuccess } = useTag()

      ; (apiClient.delete as unknown as Mock).mockResolvedValue({})
    await removeTag(3)
    expect(deleteSuccess.value).toBe(true)
  })

  it('removes a tag and sets error on failure', async () => {
    ; (apiClient.delete as unknown as Mock).mockRejectedValue(new Error('boom'))
    const { removeTag, deleteSuccess, deleteError } = useTag()
    await removeTag(4)
    expect(deleteError.value).toBe(true)
    expect(deleteSuccess.value).toBe(false)
  })
})
