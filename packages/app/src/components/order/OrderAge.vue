<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{ created: number }>()

const diff = computed(() => {
  const duration = dayjs().diff(dayjs.unix(props.created))
  return Math.round(duration / 1000 / 86400)
})
</script>

<template>
  <BContainer size="m" v-if="diff > 14">
    <BAlert type="error">
      {{ $t('old_order', { days: diff }) }}
    </BAlert>
  </BContainer>
</template>
