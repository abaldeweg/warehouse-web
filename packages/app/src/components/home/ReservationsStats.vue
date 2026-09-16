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
    <h2 class="h2">{{ t('reservations') }}</h2>
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

    <div class="mt-l">
      <RouterLink :to="{ name: 'reservation' }" >{{ t('view_all_reservations') }}</RouterLink>
    </div>
</template>

<style scoped>
.alignRight {
  text-align: right;
}
</style>
