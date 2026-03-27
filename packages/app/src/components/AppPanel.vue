<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'

defineProps({
  isDrawerActive: Boolean,
})

const emit = defineEmits<{
  (event: 'update:isDrawerActive', value: boolean): void
  (event: 'close-drawer'): void
}>()

const catalog: string = import.meta.env.VITE_CATALOG
const settings: string = import.meta.env.VITE_SETTINGS
const shop: string = import.meta.env.VITE_SHOP
</script>

<template>
  <BPanel :model-value="isDrawerActive" @update:model-value="emit('update:isDrawerActive', $event)"
    @close="emit('close-drawer')">
    <template #header>
      <BContainer>
        <AppLogo />
      </BContainer>
    </template>

    <template #footer>
      <BButton design="text" @click="emit('close-drawer')">
        {{ $t('hide_panel') }}
      </BButton>
    </template>

      <BNavigation>
        <BNavigationItem :route="{ name: 'home' }" icon="home">{{ $t('home') }}</BNavigationItem>
        <BNavigationItem :route="catalog" icon="menu_book">{{ $t('catalog') }}</BNavigationItem>
        <BNavigationItem :route="{ name: 'reservation' }" icon="shopping_cart">{{ $t('reservations') }}</BNavigationItem>
        <BNavigationItem :route="settings" icon="settings">{{ $t('settings') }}</BNavigationItem>
        <BNavigationItem :route="shop" icon="store">{{ $t('shop') }}</BNavigationItem>
        <BNavigationItem :route="'/help'" icon="help">{{ $t('help') }}</BNavigationItem>
      </BNavigation>
  </BPanel>
</template>
