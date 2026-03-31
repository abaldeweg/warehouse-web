<script setup lang="ts">
import ConditionShow from '@/components/condition/ConditionShow.vue'
import ConditionCreate from '@/components/condition/ConditionCreate.vue'
import { useConditions } from '@/composables/conditions/useConditions'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'

const { t } = useI18n()

useHead({ title: t('conditions') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})

const { conditions, listConditions } = useConditions()
onMounted(() => {
  listConditions()
})
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('conditions') }}</h1>
    <p>{{ $t('conditions_desc') }}</p>
  </BContainer>

  <BContainer size="m" v-if="conditions && conditions.length > 0">
    <ConditionShow
      v-for="item in conditions"
      :key="item.id"
      :item="item"
      :isAdmin="user?.isAdmin ?? false"
    />
  </BContainer>

  <BContainer size="m" v-if="user?.isAdmin ?? false">
    <ConditionCreate @created="listConditions" />
  </BContainer>
</template>
