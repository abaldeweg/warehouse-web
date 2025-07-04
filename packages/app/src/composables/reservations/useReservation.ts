import { ref, watch } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Reservation } from '@/types/reservation'
import type { Book } from '@/types/book'
import type { UseReservation } from '@/types/composables'

/**
 * useReservation composable for managing a single reservation.
 */
export function useReservation(reservationId: string): UseReservation {
  const reservation = ref<Reservation | null>(null)

  /**
   * Function to fetch reservation data by ID
   */
  const fetchReservation = async (id: string) => {
    try {
      const response = await apiClient.get(`/api/reservation/${id}`)
      reservation.value = response.data
    } catch (error) {
      console.error('Failed to fetch reservation:', error)
    }
  }

  /**
   * Function to update the reservation data
   */
  const updateReservation = async () => {
    try {
      let reservationData = { ...reservation.value }
      if (reservationData.books) {
        reservationData.books = reservationData.books.map((book: Book) => ({
          ...book,
        }))
      }
      if (reservation.value && 'id' in reservation.value) {
        await apiClient.put(`/api/reservation/${reservation.value.id}`, reservationData)
      }
    } catch (error) {
      console.error('Failed to update reservation:', error)
    }
  }

  /**
   * Function to remove the reservation
   */
  const removeReservation = async () => {
    try {
      if (reservation.value && 'id' in reservation.value) {
        await apiClient.delete(`/api/reservation/${reservation.value.id}`)
      }
    } catch (error) {
      console.error('Failed to remove reservation:', error)
    }
  }

  watch(
    () => reservationId,
    (newId) => {
      if (newId) {
        fetchReservation(newId)
      }
    },
    { immediate: true },
  )

  return { reservation, fetchReservation, updateReservation, removeReservation }
}
