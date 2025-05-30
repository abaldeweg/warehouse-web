<script setup lang="ts">
import { useDate } from '@/composables/useDate'
import { useI18n } from 'vue-i18n'
import type { Reservation } from '@/composables/useReservation'

defineProps<{ reservation: Reservation }>()

const emit = defineEmits<{ (event: 'remove'): void }>()

const { t } = useI18n()

const { isOlderThan } = useDate()
</script>

<template>
  <BAlert type="error" v-if="isOlderThan(14, reservation.createdAt)">
    <BFlex justify="space-between" :align="'center'">
      {{ $t('old_reservation') }}
      <BButton design="primary_danger" @click="emit('remove')" :style="{ float: 'right' }">{{
        t('delete_reservation')
      }}</BButton>
    </BFlex>
  </BAlert>
</template>
