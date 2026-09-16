<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Stats } from '@/types/model/stats'

defineProps<{
  stats?: Stats | null
}>()

const { t } = useI18n()
</script>

<template>
  <div  v-if="stats">
    <h2 class="h2">{{ t('products') }}</h2>
    <BTable>
      <table :aria-label="t('book_statistics_desc')">
        <tbody>
          <tr>
            <td>{{ t('products') }}</td>
            <td class="alignRight">{{ stats.all }}</td>
          </tr>
          <tr>
            <td>{{ t('available_products') }}</td>
            <td class="alignRight">{{ stats.available }}</td>
          </tr>
          <tr>
            <td>{{ t('reserved_products') }}</td>
            <td class="alignRight">{{ stats.reserved }}</td>
          </tr>
          <tr>
            <td>{{ t('sold_products') }}</td>
            <td class="alignRight">{{ stats.sold }}</td>
          </tr>
          <tr>
            <td>{{ t('removed_products') }}</td>
            <td class="alignRight">{{ stats.removed }}</td>
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
