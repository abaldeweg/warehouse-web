<script setup lang="ts">
defineProps<{ open: boolean }>()
</script>

<template>
  <BContainer size="m">
    <h2>{{ $t('status') }}</h2>

    <BForm @submit.prevent="$emit('update')">
      <BFormGroup>
        <BFormItem>
          <BSwitch :modelValue="open" @update:modelValue="$emit('update:open', $event)" :label="$t('is_new')" />
        </BFormItem>
      </BFormGroup>
    </BForm>
  </BContainer>
</template>
