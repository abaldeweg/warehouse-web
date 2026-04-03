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

const { conditions, criteria, sort, processedConditions, listConditions } = useConditions()
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

  <BContainer size="m">
    <h2>{{ $t('create_condition') }}</h2>

    <BAlert variant="info" v-if="!user?.isAdmin">
      <p>{{ $t('only_admin_can_create_conditions') }}</p>
    </BAlert>

    <ConditionCreate @created="listConditions" v-if="user?.isAdmin" />
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('all_conditions') }}</h2>

    <BAlert variant="info" v-if="!conditions || conditions.length === 0">
      <p>{{ $t('no_conditions_available') }}</p>
    </BAlert>

    <div v-if="conditions && conditions.length > 0">
      <div class="options">
        <div class="option filter">
          <div class="icon">
            <BMaterialIcon>filter_alt</BMaterialIcon>
          </div>
          <div class="form">
            <BInput
              type="search"
              v-model="criteria"
              name="criteria"
              id="criteria"
              :label="$t('filter_by_name')"
              hideLabel
              :placeholder="$t('filter_by_name')"
            />
          </div>
        </div>
        <div class="option sort">
          <div class="icon">
            <BMaterialIcon>sort_by_alpha</BMaterialIcon>
          </div>
          <div class="form">
            <BSelect
              v-model="sort"
              type="options"
              name="sort"
              id="sort"
              :label="$t('sort_direction')"
              hideLabel
              :options="[
                { key: null, value: $t('sort_none') },
                { key: 'asc', value: $t('sort_asc') },
                { key: 'desc', value: $t('sort_desc') },
              ]"
            />
          </div>
        </div>
      </div>

      <ConditionShow
        v-for="condition in processedConditions"
        :key="condition.id"
        :condition="condition"
        :isAdmin="user?.isAdmin ?? false"
      />
    </div>
  </BContainer>
</template>

<style scoped>
.options {
  display: flex;
  gap: 20px;
  flex-direction: column;
}
.option {
  display: flex;
  align-items: center;
  gap: 10px;
}
.filter {
  flex: 1;
}
.option .icon {
  display: flex;
  align-items: center;
}
.option .form {
  flex: 1;
}

@media (min-width: 600px) {
  .options {
    flex-direction: row;
  }
  .sort {
    width: 200px;
  }
}
</style>
