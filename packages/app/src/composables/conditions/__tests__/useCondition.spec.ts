import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

import { useCondition } from '../useCondition'
import { apiClient } from '@/api/apiClient'

describe('useCondition', () => {
  beforeEach(() => vi.clearAllMocks())

  it('createCondition posts and returns id', async () => {
    ; (apiClient.post as Mock).mockResolvedValue({ data: { id: 42 } })
    const { createCondition } = useCondition()
    const id = await createCondition('New')
    expect(id).toBe(42)
    expect(apiClient.post).toHaveBeenCalledWith('/api/condition/new', { name: 'New' })
  })

  it('updateCondition calls put', async () => {
    ; (apiClient.put as Mock).mockResolvedValue({})
    const { updateCondition } = useCondition()
    await updateCondition(5, 'Updated')
    expect(apiClient.put).toHaveBeenCalledWith('/api/condition/5', { name: 'Updated' })
  })

  it('removeCondition sets success on success', async () => {
    ; (apiClient.delete as Mock).mockResolvedValue({})
    const { removeCondition, deleteSuccess, deleteError } = useCondition()
    await removeCondition(7)
    expect(deleteSuccess.value).toBe(true)
    expect(deleteError.value).toBe(false)
  })

  it('removeCondition sets error on failure', async () => {
    ; (apiClient.delete as Mock).mockRejectedValue(new Error('fail'))
    const { removeCondition, deleteSuccess, deleteError } = useCondition()
    await removeCondition(8)
    expect(deleteSuccess.value).toBe(false)
    expect(deleteError.value).toBe(true)
  })
})
