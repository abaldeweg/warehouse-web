import { ref } from 'vue'
import type { Ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { UsePassword } from '@/types/composables'

/**
 * usePassword composable for managing password changes.
 */
export function usePassword(): UsePassword {
  const password: Ref<string | null> = ref(null)
  const isChangingPassword: Ref<boolean> = ref(false)
  const passwordSuccessful: Ref<boolean> = ref(false)
  const passwordError: Ref<boolean> = ref(false)

  /**
   * Attempts to change the user's password by sending a PUT request to the API.
   */
  const changePassword = async (): Promise<void> => {
    isChangingPassword.value = true

    const response = await apiClient.put('/api/password', {
      password: password.value,
    })

    if (response.status === 200) {
      passwordSuccessful.value = true
    }

    if (response.status !== 200) {
      passwordError.value = true
    }

    isChangingPassword.value = false
  }

  return {
    password,
    isChangingPassword,
    passwordSuccessful,
    passwordError,
    changePassword,
  }
}
