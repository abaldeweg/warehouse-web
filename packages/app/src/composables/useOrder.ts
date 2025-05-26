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
  orders: Ref<Order[] | null>
  order: Ref<Order | null>
  isLoading: Ref<boolean>
  list: () => Promise<void>
  show: (id: string) => Promise<void>
  update: (data: any) => Promise<void>
  remove: (id: string) => Promise<void>
}

const orders = ref<Order[] | null>(null)

export function useOrder(): UseOrder {
  const order = ref<Order | null>(null)

  const isLoading = ref(false)

  const flatten = (data: any[]): string => {
    return data.map((element) => element.id).join(',')
  }

  const list = async () => {
    isLoading.value = true

    try {
      const res = await apiClient.get('/api/reservation/list')
      orders.value = res.data
    } finally {
      isLoading.value = false
    }
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
    await list()
  }

  return {
    orders,
    order,
    isLoading,
    list,
    show,
    update,
    remove,
  }
}
