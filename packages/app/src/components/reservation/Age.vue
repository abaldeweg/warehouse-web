<script setup lang="ts">
import { useDate } from '@/composables/useDate'
import { useOrder } from '@/composables/useOrder.js'
import { useI18n } from 'vue-i18n'

defineProps<{ id: string; created: number }>()

const { t } = useI18n()

const { isOlderThan } = useDate()

const { remove } = useOrder()
</script>

<template>
  <BAlert type="error" v-if="isOlderThan(14, created)">
    <BFlex justify="space-between" :align="'center'">
      <span>{{ $t('old_reservation') }}</span>
      <BButton design="primary_danger" @click="remove(id)" :style="{ float: 'right' }">{{
        t('delete_reservation')
      }}</BButton>
    </BFlex>
  </BAlert>
</template>
