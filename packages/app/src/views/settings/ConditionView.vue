<script setup lang="ts">
import ConditionShow from '@/components/condition/ConditionShow.vue'
import ConditionCreate from '@/components/condition/ConditionCreate.vue'
import { useConditions } from '@/composables/conditions/useConditions'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'
import AppToolbar from '@/components/AppToolbar.vue'

const { t } = useI18n()

useHead({ title: t('conditions') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})

const { conditions, criteria, filteredConditions, listConditions } = useConditions()
onMounted(() => {
  listConditions()
})
</script>

<template>
  <BContainer size="m">
    <AppToolbar>
      <template #left>
        <RouterLink :to="{ name: 'settings' }">&lang; {{ $t('back') }}</RouterLink>
      </template>
    </AppToolbar>
  </BContainer>

  <BContainer size="m">
    <h1>{{ $t('conditions') }}</h1>
    <p>{{ $t('conditions_desc') }}</p>
  </BContainer>

  <BContainer size="m" v-if="user?.isAdmin ?? false">
    <h2>{{ $t('create_condition') }}</h2>
    <ConditionCreate @created="listConditions" />
  </BContainer>

  <BContainer size="m" v-if="conditions && conditions.length > 0">
    <h2>{{ $t('all_conditions') }}</h2>
    <BInput type="search" v-model="criteria" :placeholder="$t('filter_by_name')" />
    <ConditionShow
      v-for="item in filteredConditions"
      :key="item.id"
      :item="item"
      :isAdmin="user?.isAdmin ?? false"
    />
  </BContainer>
</template>
