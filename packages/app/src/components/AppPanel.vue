<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'

defineProps({
  isDrawerActive: Boolean,
})

const catalog: string = import.meta.env.VITE_CATALOG
const settings: string = import.meta.env.VITE_SETTINGS
const shop: string = import.meta.env.VITE_SHOP
</script>

<template>
  <BPanel
    :model-value="isDrawerActive"
    @update:model-value="$emit('update:isDrawerActive', $event)"
    @close="$emit('close-drawer')"
  >
    <template #header>
      <BContainer>
        <AppLogo />
      </BContainer>
    </template>

    <BContainer size="m">
      <BNav
        :nav="[
          { route: { name: 'home' }, title: $t('home') },
          { route: catalog, title: $t('catalog') },
          { route: { name: 'reservation' }, title: $t('reservations') },
          { route: settings, title: $t('settings') },
          { route: shop, title: $t('shop') },
        ]"
      />
    </BContainer>
  </BPanel>
</template>
