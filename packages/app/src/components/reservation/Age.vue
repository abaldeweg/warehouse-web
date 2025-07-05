<script setup lang="ts">
import { useDate } from '@/composables/holidays/useDate'
import { useI18n } from 'vue-i18n'
import type { Reservation } from '@/types/model/reservation'

defineProps<{ reservation: Reservation }>()

const emit = defineEmits<{ (event: 'remove'): void }>()

const { t } = useI18n()

const { isOlderThan } = useDate()
</script>

<template>
  <BAlert type="danger" v-if="isOlderThan(14, reservation.createdAt)">
    <div class="age_alert">
      {{ $t('old_reservation') }}
      <BButton design="primary_danger" @click="emit('remove')" :style="{ float: 'right' }">{{
        t('delete_reservation')
      }}</BButton>
    </div>
  </BAlert>
</template>

<style scoped>
.age_alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
