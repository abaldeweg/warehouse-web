import { computed, readonly, ref, watchEffect } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Reservation } from '@/types/model/reservation'
import type { UseReservations } from '@/types/composables'

/**
 * A composable to manage reservations.
 */
export function useReservations(): UseReservations {
  const reservations = ref<Reservation[]>([])

  const reservationsCount = computed(() => {
    return reservations.value?.length || 0
  })

  /**
   * Fetches the list of reservations from the API and updates the reactive reservations array.
   */
  const fetchReservations = async () => {
    try {
      const response = await apiClient.get<Reservation[]>('/api/reservation/list')
      reservations.value = response.data
    } catch (error) {
      console.error('Failed to fetch reservations:', error)
    }
  }

  watchEffect(() => {
    if (reservations.value.length === 0) {
      fetchReservations()
    }
  })

  return {
    reservations,
    reservationsCount: readonly(reservationsCount),
    fetchReservations,
  }
}
