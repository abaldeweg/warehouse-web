<script setup lang="ts">
import FormatShow from '@/components/format/FormatShow.vue'
import FormatCreate from '@/components/format/FormatCreate.vue'
import { useFormats } from '@/composables/formats/useFormats'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'
import AppToolbar from '@/components/AppToolbar.vue'
import OptionsFilterSort from '@/components/OptionsFilterSort.vue'

const { t } = useI18n()

useHead({ title: t('formats') })

const { user, fetchUser } = useToken()
const { formats, criteria, sort, isLoading, processedFormats, listFormats, counter } = useFormats()

onMounted(async () => {
  await fetchUser()
  if (!user.value) return
  await listFormats()
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
    <h1>{{ $t('formats') }} ({{ counter }})</h1>
    <p>{{ $t('formats_desc') }}</p>
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('create_format') }}</h2>

    <BAlert type="info" v-if="user && !user?.isAdmin">
      {{ $t('only_admin_can_create_formats') }}
    </BAlert>

    <FormatCreate @created="listFormats" v-if="user?.isAdmin" />
  </BContainer>

  <BContainer size="m">
    <h2>{{ $t('all_formats') }}</h2>

    <BAlert type="info" v-if="!isLoading && (!formats || formats.length === 0)">
      {{ $t('no_formats_available') }}
    </BAlert>

    <div v-if="user && formats && formats.length > 0">
      <OptionsFilterSort v-model:criteria="criteria" v-model:sort="sort" />

      <FormatShow
        v-for="format in processedFormats"
        :key="format.id"
        :format="format"
        :isAdmin="user?.isAdmin ?? false"
      />
    </div>
  </BContainer>
</template>
