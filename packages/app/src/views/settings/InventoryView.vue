<script setup lang="ts">
import InventoryTable from '@/components/inventory/InventoryTable.vue'
import { useInventory } from '@/composables/inventory/useInventory'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'

const { t } = useI18n()

useHead({ title: t('inventory') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})

const { inventories, hasActiveInventory, listInventories, createInventory, endInventory } =
  useInventory()
onMounted(() => {
  listInventories()
})
</script>

<template>
  <BContainer size="m">
    <RouterLink :to="{ name: 'settings' }">&lang; {{ $t('back') }}</RouterLink>
  </BContainer>

  <BContainer size="m">
    <BButton
      :style="{ float: 'right' }"
      design="outline"
      @click.prevent="createInventory"
      v-if="!hasActiveInventory && user && user.isAdmin"
    >
      {{ $t('create_inventory') }}
    </BButton>

    <h1>{{ $t('inventory') }}</h1>
    <p>{{ $t('inventory_desc') }}</p>
  </BContainer>

  <BContainer size="m" v-if="inventories">
    <InventoryTable
      v-if="user"
      :inventories="inventories"
      :isAdmin="user.isAdmin"
      @end="endInventory"
    />
  </BContainer>
</template>
