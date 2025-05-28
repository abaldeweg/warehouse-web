import { ref, watch, type Ref } from 'vue'
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
  reservation: Ref<Reservation | null>
  fetchReservation: (id: string) => Promise<void>
  updateReservation: () => Promise<void>
  removeReservation: () => Promise<void>
}

export function useReservation(reservationId: string): UseReservation {
  const reservation = ref<Reservation | null>(null)

  const fetchReservation = async (id: string) => {
    try {
      const response = await apiClient.get(`/api/reservation/${id}`)
      reservation.value = response.data
    } catch (error) {
      console.error('Failed to fetch reservation:', error)
    }
  }

  const updateReservation = async () => {
    try {
      let reservationData = { ...reservation.value }
      if (reservationData.books) {
        reservationData.books = reservationData.books.map((book: any) => ({ id: book.id }))
      }
      if (reservation.value && 'id' in reservation.value) {
        await apiClient.put(`/api/reservation/${reservation.value.id}`, reservationData)
      }
    } catch (error) {
      console.error('Failed to update reservation:', error)
    }
  }

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
