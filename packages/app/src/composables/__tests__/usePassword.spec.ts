import { describe, it, expect, vi } from 'vitest'
import { usePassword } from '../usePassword'
import { apiClient } from '@/api/apiClient'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    put: vi.fn().mockResolvedValue({ status: 200 }),
  },
}))

describe('usePassword', () => {
  it('should set isChangingPassword to true when changePassword is called', async () => {
    const { changePassword, isChangingPassword } = usePassword()
    apiClient.put.mockResolvedValueOnce({ status: 200 })

    const promise = changePassword()

    expect(isChangingPassword.value).toBe(true)

    await promise
  })

  it('should set passwordSuccessful to true on successful password change', async () => {
    const { changePassword, passwordSuccessful } = usePassword()
    apiClient.put.mockResolvedValueOnce({ status: 200 })

    await changePassword()

    expect(passwordSuccessful.value).toBe(true)
  })

  it('should set passwordError to true on failed password change', async () => {
    const { changePassword, passwordError } = usePassword()
    apiClient.put.mockResolvedValueOnce({ status: 400 })

    await changePassword()

    expect(passwordError.value).toBe(true)
  })

  it('should set isChangingPassword to false after changePassword is called', async () => {
    const { changePassword, isChangingPassword } = usePassword()
    apiClient.put.mockResolvedValueOnce({ status: 200 })

    await changePassword()

    expect(isChangingPassword.value).toBe(false)
  })
})
