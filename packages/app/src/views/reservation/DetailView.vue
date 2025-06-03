<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import OrderAge from '@/components/reservation/Age.vue'
import OrderTable from '@/components/reservation/Table.vue'
import OrderCustomer from '@/components/reservation/Customer.vue'
import OrderToolbar from '@/components/reservation/Toolbar.vue'
import { useDate } from '@/composables/useDate.ts'
import { useReservation } from '@/composables/useReservation'
import { useProduct } from '@/composables/useProduct.js'

const props = defineProps<{ id: string }>()

const { t } = useI18n()

useHead({ title: t('reservation') })

const isDeleteDialogVisible = ref(false)

const { reservation, updateReservation, removeReservation } = useReservation(props.id)

const updateStatus = (status?: boolean): void => {
  if (status && reservation.value) {
    reservation.value.open = status
  }
  updateReservation()
}

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

// Function to sell all products in the reservation
const sellProducts = (): void => {
  if (reservation.value) {
    sellAll(reservation.value.books)
    reservation.value.books = []
  }
}

const remove = (): void => {
  if (reservation.value && reservation.value.books.length > 0) {
    isDeleteDialogVisible.value = true
  } else {
    removeReservation()
  }
}

const sellAndDelete = (): void => {
  sellProducts()
  removeReservation()
  isDeleteDialogVisible.value = false
}
</script>

<template>
  <div v-if="reservation">
    <BContainer size="m">
      <OrderToolbar
        :reservation="reservation"
        @remove="remove"
        @update="updateStatus"
        @sellProducts="sellProducts"
      />
    </BContainer>

    <BContainer size="m">
      <OrderAge :reservation="reservation" @remove="remove" />
    </BContainer>

    <BContainer size="m">
      <h1>{{ $t('reservation_from') }} {{ toLocaleDateString(reservation.createdAt) }}</h1>
    </BContainer>

    <BContainer size="m">
      <OrderTable :products="reservation.books" @remove="removeReservation" />
    </BContainer>

    <BContainer size="m">
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
