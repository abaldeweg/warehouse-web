import { ref } from 'vue'
import type { Ref } from 'vue'
import { apiClient } from '@/api/apiClient'

interface Order {
  id: string
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

interface UseOrder {
  order: Ref<Order | null>
  isLoading: Ref<boolean>
  show: (id: string) => Promise<void>
  update: (data: any) => Promise<void>
  remove: (id: string) => Promise<void>
}

export function useOrder(): UseOrder {
  const order = ref<Order | null>(null)

  const isLoading = ref(false)

  const flatten = (data: any[]): string => {
    return data.map((element) => element.id).join(',')
  }

  const show = async (id: string) => {
    const res = await apiClient.get(`/api/reservation/${id}`)
    order.value = res.data
  }

  const update = async (data: any) => {
    if (!data) return

    await apiClient.put(`/api/reservation/${data.id}`, {
      notes: data.notes,
      books: flatten(data.books),
      salutation: data.salutation,
      firstname: data.firstname,
      surname: data.surname,
      mail: data.mail,
      phone: data.phone,
      open: data.open,
    })
  }

  const remove = async (id: string) => {
    await apiClient.delete(`/api/reservation/${id}`)
  }

  return {
    order,
    isLoading,
    show,
    update,
    remove,
  }
}
