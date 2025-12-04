<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  countAllReservations?: number
  countOpenReservations?: number
  countOutdatedReservations?: number
}>()

const { t } = useI18n()
</script>

<template>
  <BContainer size="m" :style="{ paddingLeft: 0, paddingRight: 0 }">
    <h2>{{ t('reservations') }}</h2>
    <BTable>
      <table :aria-label="t('reservations_statistics_desc')">
        <tbody>
          <tr>
            <td>{{ t('total') }}</td>
            <td class="alignRight">{{ countAllReservations }}</td>
          </tr>
          <tr>
            <td>{{ t('new') }}</td>
            <td class="alignRight">{{ countOpenReservations }}</td>
          </tr>
          <tr>
            <td>{{ t('outdated') }}</td>
            <td class="alignRight">{{ countOutdatedReservations }}</td>
          </tr>
        </tbody>
      </table>
    </BTable>
  </BContainer>

  <BContainer size="m" :style="{ paddingLeft: 0, paddingRight: 0 }">
    <RouterLink :to="{ name: 'reservation' }">{{ t('view_all_reservations') }}</RouterLink>
  </BContainer>
</template>

<style scoped>
.alignRight {
  text-align: right;
}
</style>
