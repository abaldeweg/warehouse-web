<script setup lang="ts">
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

const { reservation, updateReservation, removeReservation } = useReservation(props.id)

const updateStatus = (status?: string): void => {
  if (status && reservation.value) {
    ;(reservation.value as any).status = status
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
</script>

<template>
  <div v-if="reservation">
    <BContainer size="m">
      <OrderToolbar
        :reservation="reservation"
        @remove="removeReservation"
        @update="updateStatus"
        @sellProducts="sellProducts"
      />
    </BContainer>

    <BContainer size="m">
      <OrderAge :reservation="reservation" @remove="removeReservation" />
    </BContainer>

    <BContainer size="m">
      <h1>{{ $t('reservation_from') }} {{ toLocaleDateString(reservation.createdAt) }}</h1>
    </BContainer>

    <BContainer size="m">
      <OrderTable :products="reservation.books" />
    </BContainer>

    <BContainer size="m">
      <OrderCustomer :reservation="reservation" @update="updateCustomer" />
    </BContainer>
  </div>
</template>
