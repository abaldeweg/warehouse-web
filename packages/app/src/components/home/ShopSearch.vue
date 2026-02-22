<script setup lang="ts">
import type { Analyze } from '@/types/model/analyze'
import { useI18n } from 'vue-i18n'
import type { Genre } from '@/types/model/genre'

const props = defineProps<{
  analyze?: Analyze[] | null,
  genres?: Genre[] | null
}>()

const { t } = useI18n()

/**
 * Get genre name by id
 */
const genreName = (id: Genre['id'] | null | undefined) => {
  return props.genres?.find(genre => genre.id === id)?.name || ''
}
</script>

<template>
  <h2>{{ t('shop_search') }}</h2>
  <p>{{ t('shop_search_description') }}</p>
  <table v-if="props.analyze && props.analyze.length">
    <thead>
      <tr>
        <th>{{ t('date') }}</th>
        <th>{{ t('term') }}</th>
        <th>{{ t('page') }}</th>
        <th>{{ t('genre') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.analyze" :key="item.id">
        <td>{{ item.date }}</td>
        <td>{{ item.term }}</td>
        <td>{{ item.page }}</td>
        <td>{{ genreName(item.genre) }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else>{{ t('no_analyze_data') }}</p>
</template>
