<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Reservation } from '@/types/model/reservation'

const props = defineProps<{ reservation: Reservation }>()

const { t } = useI18n()
</script>

<template>
  <h2>{{ t('customer') }}</h2>

  <table class="customer-table">
    <tbody>
      <tr>
        <th>{{ t('salutation') }}</th>
        <td>
          <span v-if="props.reservation.salutation === 'f'">{{ t('mrs') }}</span>
          <span v-if="props.reservation.salutation === 'ml'">{{ t('mr') }}</span>
          <span v-if="props.reservation.salutation === 'd'">{{ t('none_diverse') }}</span>
        </td>
      </tr>
      <tr>
        <th>{{ t('firstname') }}</th>
        <td>{{ props.reservation.firstname }}</td>
      </tr>
      <tr>
        <th>{{ t('surname') }}</th>
        <td>{{ props.reservation.surname }}</td>
      </tr>
      <tr>
        <th>{{ t('mail') }}</th>
        <td>{{ props.reservation.mail }}</td>
      </tr>
      <tr>
        <th>{{ t('phone') }}</th>
        <td>{{ props.reservation.phone }}</td>
      </tr>
      <tr>
        <th>{{ t('notes') }}</th>
        <td>{{ props.reservation.notes }}</td>
      </tr>
    </tbody>
  </table>
</template>
