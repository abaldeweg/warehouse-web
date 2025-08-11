<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import OrderAge from '@/components/reservation/Age.vue'
import OrderTable from '@/components/reservation/Table.vue'
import OrderCustomer from '@/components/reservation/Customer.vue'
import OrderToolbar from '@/components/reservation/Toolbar.vue'
import { useDate } from '@/composables/holidays/useDate'
import { useReservation } from '@/composables/reservations/useReservation'
import { useProduct } from '@/composables/products/useProduct'
import { useRouter } from 'vue-router'

const props = defineProps<{ id: string }>()

const { t } = useI18n()

useHead({ title: t('reservation') })

const isDeleteDialogVisible = ref(false)

const { reservation, updateReservation, removeReservation } = useReservation(props.id)

const router = useRouter()

/**
 * Updates the reservation status.
 */
const updateStatus = (status?: boolean): void => {
  if (status && reservation.value) {
    reservation.value.open = status
  }
  updateReservation()
}

/**
 * Updates the customer information in the reservation.
 */
const updateCustomer = (fields: {
  salutation: string
  firstname: string
  surname: string
  mail: string
  phone: string
  notes: string
}): void => {
  if (reservation.value) {
    Object.assign(reservation.value, fields)
    updateReservation()
  }
}

const { toLocaleDateString } = useDate()

const { sellAll } = useProduct()

/**
 * Function to sell all products in the reservation
 */
const sellProducts = (): void => {
  if (reservation.value) {
    sellAll(reservation.value.books)
    reservation.value.books = []
  }
}

/**
 * Function to remove the reservation
 */
const remove = (): void => {
  if (reservation.value && reservation.value.books.length > 0) {
    isDeleteDialogVisible.value = true
  } else {
    removeReservation()
    router.push({ name: 'reservation' })
  }
}

/**
 * Function to sell products and then delete the reservation
 */
const sellAndDelete = (): void => {
  sellProducts()
  removeReservation()
  isDeleteDialogVisible.value = false
}

const { book, show, update } = useProduct()

/**
 * Removes a product from the reservation by id.
 */
const removeProduct = async (productId: string): Promise<void> => {
  await show(productId)
  if (!book.value) return
  book.value.reserved = false
  book.value.reservedAt = null
  await update(book.value)
  if (reservation.value) {
    reservation.value.books = reservation.value.books.filter((book: any) => book.id !== productId)
  }
}
</script>

<template>
  <div v-if="reservation" class="reservation_order">
    <BContainer size="m">
      <OrderToolbar :reservation="reservation" @remove="remove" @update="updateStatus" @sellProducts="sellProducts" />
    </BContainer>

    <BContainer size="m">
      <OrderAge :reservation="reservation" @remove="remove" />
    </BContainer>

    <BContainer size="m">
      <h1>{{ $t('reservation_from') }} {{ toLocaleDateString(reservation.createdAt) }}</h1>
    </BContainer>

    <BContainer size="m" class="products">
      <OrderTable :products="reservation.books" @remove="remove" @remove-product="removeProduct" />
    </BContainer>

    <BContainer size="m" class="customer">
      <OrderCustomer :reservation="reservation" @update="updateCustomer" />
    </BContainer>
  </div>

  <BDialog v-model="isDeleteDialogVisible">
    {{ t('remove_books_before_delete') }}
    <template #actions>
      <BButton design="outline_danger" @click="sellAndDelete" :style="{ marginRight: '20px' }">{{
        t('sell_products_and_delete_reservation')
      }}</BButton>
      <BButton design="outline" @click="isDeleteDialogVisible = false">{{ t('close') }}</BButton>
    </template>
  </BDialog>
</template>

<style scoped>
@media print {
  .reservation_order {
    display: flex;
    flex-direction: column;
  }

  .container.container_size_m {
    width: 100%;
  }

  .products {
    order: 2;
  }

  .customer {
    order: 1;
  }
}
</style>
