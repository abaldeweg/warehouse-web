<script setup lang="ts">
import InventoryTable from '@/components/inventory/InventoryTable.vue'
import { useInventory } from '@/composables/inventory/useInventory'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { useInventories } from '@/composables/inventory/useInventories'

const { t } = useI18n()

useHead({ title: t('inventory') })

const { user, fetchUser } = useToken()
const { inventories, hasActiveInventory, listInventories } = useInventories()

onMounted(async () => {
  await fetchUser()
  if (user) {
    await listInventories()
  }
})

const { createInventory } = useInventory()

const create = async (): Promise<void> => {
  await createInventory()
  await listInventories()
}
</script>

<template>
  <BContainer size="m">
    <AppToolbar>
      <template #left>
        <RouterLink :to="{ name: 'settings' }">&lang; {{ $t('back') }}</RouterLink>
      </template>
      <template #right>
        <BButton
          design="outline"
          @click="create"
          v-if="!hasActiveInventory && user && user.isAdmin"
        >
          {{ $t('create_inventory') }}
        </BButton>
      </template>
    </AppToolbar>
  </BContainer>

  <BContainer size="m">
    <h1>{{ $t('inventory') }}</h1>
    <p>{{ $t('inventory_desc') }}</p>
  </BContainer>

  <BContainer size="m">
    <BAlert type="info" v-if="!inventories">{{ t('no_inventories_found') }}</BAlert>

    <InventoryTable
      :inventories="inventories"
      :isAdmin="user?.isAdmin"
      @end="listInventories"
      v-if="inventories && user"
    />
  </BContainer>
</template>
