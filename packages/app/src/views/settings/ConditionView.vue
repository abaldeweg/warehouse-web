<script setup lang="ts">
import ConditionShow from '@/components/condition/ConditionShow.vue'
import ConditionCreate from '@/components/condition/ConditionCreate.vue'
import { useConditions } from '@/composables/conditions/useConditions'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'
import AppToolbar from '@/components/AppToolbar.vue'
import OptionsFilterSort from '@/components/OptionsFilterSort.vue'

const { t } = useI18n()

useHead({ title: t('conditions') })

const { user, fetchUser } = useToken()
const { conditions, criteria, sort, isLoading, processedConditions, listConditions, counter } =
  useConditions()

onMounted(async () => {
  await fetchUser()
  if (!user.value) return
  await listConditions()
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
    <h1>{{ $t('conditions') }} ({{ counter }})</h1>
    <p>{{ $t('conditions_desc') }}</p>
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('create_condition') }}</h2>

    <BAlert type="info" v-if="user && !user?.isAdmin">
      <p>{{ $t('only_admin_can_create_conditions') }}</p>
    </BAlert>

    <ConditionCreate @created="listConditions" v-if="user?.isAdmin" />
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('all_conditions') }}</h2>

    <BAlert type="info" v-if="!isLoading && (!conditions || conditions.length === 0)">
      <p>{{ $t('no_conditions_available') }}</p>
    </BAlert>

    <div v-if="user && conditions && conditions.length > 0">
      <OptionsFilterSort v-model:criteria="criteria" v-model:sort="sort" />

      <ConditionShow
        v-for="condition in processedConditions"
        :key="condition.id"
        :condition="condition"
        :isAdmin="user?.isAdmin ?? false"
      />
    </div>
  </BContainer>
</template>
