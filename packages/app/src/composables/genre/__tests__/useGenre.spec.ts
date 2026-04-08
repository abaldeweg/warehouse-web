import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useGenre } from '../useGenre'
import { apiClient } from '@/api/apiClient'

describe('useGenre', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('createGenre returns new id', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValue({ data: { id: 1 } })
    const { createGenre } = useGenre()
    const id = await createGenre('New')
    expect(id).toBe(1)
  })

  it('updateGenre calls put', async () => {
    const put = vi.spyOn(apiClient, 'put').mockResolvedValue({})
    const { updateGenre } = useGenre()
    await updateGenre(2, 'Updated')
    expect(put).toHaveBeenCalledWith('/api/genre/2', { name: 'Updated' })
  })

  it('removeGenre sets success', async () => {
    vi.spyOn(apiClient, 'delete').mockResolvedValue({})
    const { removeGenre, deleteSuccess, deleteError } = useGenre()
    await removeGenre(3)
    expect(deleteSuccess.value).toBe(true)
    expect(deleteError.value).toBe(false)
  })

  it('removeGenre sets error', async () => {
    vi.spyOn(apiClient, 'delete').mockRejectedValue(new Error('fail'))
    const { removeGenre, deleteSuccess, deleteError } = useGenre()
    await removeGenre(4)
    expect(deleteSuccess.value).toBe(false)
    expect(deleteError.value).toBe(true)
  })
})
