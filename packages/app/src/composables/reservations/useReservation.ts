import { ref, watch } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Reservation } from '@/types/model/reservation'
import type { Book } from '@/types/model/book'
import type { Ref } from 'vue'

interface UseReservation {
  reservation: Ref<Reservation | null>
  fetchReservation: (id: string) => Promise<void>
  updateReservation: () => Promise<void>
  removeReservation: () => Promise<void>
  reserveProduct: (productId: string) => Promise<void>
}

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

  /**
   * Adds a product to this reservation again, using the book update endpoint.
   */
  const reserveProduct = async (productId: string): Promise<void> => {
    const res = await apiClient.get('/api/book/' + productId)
    const data = res.data

    const tags: any[] = []
    data.tags.forEach((element: { id: any }) => {
      tags.push(element.id)
    })

    const book = {
      added: new Date(data.added).getTime(),
      title: data.title,
      shortDescription: data.shortDescription,
      author: data.author.surname + ',' + data.author.firstname,
      genre: data.genre.id,
      price: data.price,
      sold: data.sold,
      removed: data.removed,
      reserved: true,
      reservation_id: reservationId,
      releaseYear: data.releaseYear !== '' ? data.releaseYear : 0,
      cond: data.condition?.id,
      tags: tags,
      recommendation: data.recommendation,
      format: data.format.id,
      subtitle: data.subtitle,
      duplicate: data.duplicate,
    }
    await apiClient.put('/api/book/' + data.id, book)
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

  return { reservation, fetchReservation, updateReservation, removeReservation, reserveProduct }
}
