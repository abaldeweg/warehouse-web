<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useDate } from '@/composables/reservations/useDate'
import { useReservations } from '@/composables/reservations/useReservations'

const { t } = useI18n()

useHead({ title: t('reservations') })

const { reservations } = useReservations()

const { toLocaleDateString, isOlderThan } = useDate()
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('reservations') }}</h1>
  </BContainer>

  <BContainer size="m" v-if="reservations">
    <BList v-for="reservation in reservations" :key="reservation.id"
      :route="{ name: 'reservation.detail', params: { id: reservation.id } }" divider>
      <template #title>
        {{ $t('reservation_from') }} {{ toLocaleDateString(reservation.createdAt) }}
      </template>

      <template #text>
        <span v-if="reservation.open">{{ $t('is_new') }}</span>
        <span v-if="!reservation.open && isOlderThan(14, reservation.createdAt)">{{
          $t('older_than_14_days')
        }}</span>
      </template>

      <template #controls>
        <RouterLink :to="{ name: 'reservation.detail', params: { id: reservation.id } }">
          <BMaterialIcon hover>edit</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>
  </BContainer>
</template>
