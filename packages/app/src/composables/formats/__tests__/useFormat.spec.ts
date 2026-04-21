import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useFormat } from '../useFormat'
import { apiClient } from '@/api/apiClient'

describe('useFormat', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('createFormat returns new id', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValue({ data: { id: 1 } })
    const { createFormat } = useFormat()
    const id = await createFormat('Format')
    expect(id).toBe(1)
  })

  it('updateFormat calls put', async () => {
    const put = vi.spyOn(apiClient, 'put').mockResolvedValue({})
    const { updateFormat } = useFormat()
    await updateFormat(2, 'Format')
    expect(put).toHaveBeenCalledWith('/api/format/2', { name: 'Format' })
  })

  it('removeFormat sets success', async () => {
    vi.spyOn(apiClient, 'delete').mockResolvedValue({})
    const { removeFormat, deleteSuccess, deleteError } = useFormat()
    await removeFormat(3)
    expect(deleteSuccess.value).toBe(true)
    expect(deleteError.value).toBe(false)
  })

  it('removeFormat sets error', async () => {
    vi.spyOn(apiClient, 'delete').mockRejectedValue(new Error('fail'))
    const { removeFormat, deleteSuccess, deleteError } = useFormat()
    await removeFormat(4)
    expect(deleteSuccess.value).toBe(false)
    expect(deleteError.value).toBe(true)
  })
})
