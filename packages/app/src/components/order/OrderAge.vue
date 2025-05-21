<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ created: number }>()

const outdated = computed(() => {
  const now = Date.now() / 1000
  const diff = Math.round((now - props.created))
  return diff > 14 * 86000
})
</script>

<template>
  <BAlert type="error" v-if="outdated">
    {{ $t('old_order') }}
  </BAlert>
</template>
