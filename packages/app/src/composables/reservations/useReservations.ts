import { computed, readonly, ref, watchEffect } from 'vue'
import { apiClient } from '@/api/apiClient'
import { useDate } from '@/composables/reservations/useDate'
import type { Reservation } from '@/types/model/reservation'
import type { Ref } from 'vue'

interface UseReservations {
  reservations: Ref<Reservation[]>
  readonly countAllReservations: Ref<number>
  readonly countOpenReservations: Ref<number>
  readonly countOutdatedReservations: Ref<number>
  fetchReservations: () => Promise<void>
}

/**
 * A composable to manage reservations.
 */
export function useReservations(): UseReservations {
  const { isOlderThan } = useDate()

  const reservations = ref<Reservation[]>([])

  const countAllReservations = computed(() => {
    return reservations.value?.length || 0
  })

  const countOpenReservations = computed(() => {
    return reservations.value.filter((order) => order.open === true).length
  })

  const countOutdatedReservations = computed(() => {
    return (
      reservations.value.filter((order) => isOlderThan(14, order.createdAt)).length || 0
    )
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
    countAllReservations: readonly(countAllReservations),
    countOpenReservations: readonly(countOpenReservations),
    countOutdatedReservations: readonly(countOutdatedReservations),
    fetchReservations,
  }
}
