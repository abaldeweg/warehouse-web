<script setup>
defineProps({
  isDrawerActive: Boolean,
})
</script>

<template>
  <BPanel
    :model-value="isDrawerActive"
    @update:model-value="$emit('update:isDrawerActive', $event)"
    @close="$emit('close-drawer')"
  >
    <BContainer size="m">
      <BNav :nav="[
        { route: { name: 'home' }, title: $t('home') },
        { route: { name: 'orders' }, title: $t('reservation') },
      ]" />
    </BContainer>
  </BPanel>
</template>
