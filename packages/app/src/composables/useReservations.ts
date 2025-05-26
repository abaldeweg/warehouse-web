import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { apiClient } from '@/api/apiClient'

interface Reservation {
  id: string
  branch_id: number
  branch: any
  created_at: string
  notes: string
  books: any[]
  salutation: string
  firstname: string
  surname: string
  mail: string
  phone: string
  open: boolean
  createdAt: number
}

interface UseReservation {
  reservations: Ref<Reservation[]>
  reservationsCount: Ref<number>
  fetchReservations: () => Promise<void>
}

/**
 * A composable to manage reservations.
 */
export function useReservations(): UseReservation {
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

  return {
    reservations,
    reservationsCount,
    fetchReservations,
  }
}
