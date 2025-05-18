<script setup>
defineProps({
  isDrawerActive: Boolean,
})

const catalog = import.meta.env.VITE_CATALOG
const settings = import.meta.env.VITE_SETTINGS
const shop = import.meta.env.VITE_SHOP
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
        { route: catalog, title: $t('catalog') },
        { route: { name: 'orders' }, title: $t('reservation') },
        { route: settings, title: $t('settings') },
        { route: shop, title: $t('shop') },
      ]" />
    </BContainer>
  </BPanel>
</template>
