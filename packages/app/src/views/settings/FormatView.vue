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

const { formats, criteria, filteredFormats, listFormats } = useFormats()
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
    <BInput type="search" v-model="criteria" :placeholder="$t('filter_by_name')" />
    <FormatShow
      v-for="item in filteredFormats"
      :key="item.id"
      :item="item"
      :isAdmin="user?.isAdmin ?? false"
    />
  </BContainer>
</template>
