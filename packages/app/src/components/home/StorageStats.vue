<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Stats } from '@/types/model/stats'

defineProps<{ stats: Stats | null }>()

const { t } = useI18n()
</script>

<template>
  <div v-if="stats" >
    <h2 class="h2">{{ t('storage') }}</h2>
    <BTable>
      <table :aria-label="t('storage_statistics_desc')">
        <tbody>
          <tr>
            <td>{{ t('storage_usage_cover') }}</td>
            <td class="alignRight">{{ (stats.storage / 1024).toFixed(2) }} GB</td>
          </tr>
        </tbody>
      </table>
    </BTable>
  </div>
</template>

<style scoped>
.alignRight {
  text-align: right;
}
</style>
