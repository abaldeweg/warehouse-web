<script setup lang="ts">
import { useDate } from '@/composables/useDate'

defineProps<{ created: number }>()

const { isOlderThan } = useDate()
</script>

<template>
  <BAlert type="error" v-if="isOlderThan(14, created)">
    {{ $t('old_order') }}
  </BAlert>
</template>
