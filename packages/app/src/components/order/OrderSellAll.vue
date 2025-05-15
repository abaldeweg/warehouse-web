<script setup lang="ts">
defineProps<{ id: string }>()

defineEmits(['sell-all'])
</script>

<template>
  <BContainer size="m">
    <h2>{{ $t('sell') }}</h2>

    <BFormGroup>
      <BFormItem>
        <BButton
          type="button"
          design="outline"
          @click="$emit('sell-all')"
          :style="{ marginRight: '10px' }"
        >
          {{ $t('sell_all') }}
        </BButton>
      </BFormItem>
    </BFormGroup>
  </BContainer>
</template>
