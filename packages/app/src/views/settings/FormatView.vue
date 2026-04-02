<script setup lang="ts">
import FormatShow from '@/components/format/FormatShow.vue'
import FormatCreate from '@/components/format/FormatCreate.vue'
import { useFormats } from '@/composables/formats/useFormats'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'
import AppToolbar from '@/components/AppToolbar.vue'

const { t } = useI18n()

useHead({ title: t('formats') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})

const { formats, criteria, sort, processedFormats, listFormats } = useFormats()
onMounted(() => {
  listFormats()
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
    <h1>{{ $t('formats') }}</h1>
    <p>{{ $t('formats_desc') }}</p>
  </BContainer>

  <BContainer size="m" v-if="user?.isAdmin ?? false">
    <h2>{{ $t('create_format') }}</h2>
    <FormatCreate @created="listFormats" />
  </BContainer>

  <BContainer size="m" v-if="formats && formats.length > 0">
    <h2>{{ $t('all_formats') }}</h2>
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

    <FormatShow
      v-for="item in processedFormats"
      :key="item.id"
      :item="item"
      :isAdmin="user?.isAdmin ?? false"
    />
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
