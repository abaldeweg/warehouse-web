<script setup lang="ts">
import FormatShow from '@/components/format/FormatShow.vue'
import FormatCreate from '@/components/format/FormatCreate.vue'
import { useFormats } from '@/composables/formats/useFormats'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useToken } from '@/composables/auth/useToken'
import { onMounted } from 'vue'

const { t } = useI18n()

useHead({ title: t('formats') })

const { user, fetchUser } = useToken()
onMounted(() => {
  fetchUser()
})

const { formats, listFormats } = useFormats()
onMounted(() => {
  listFormats()
})
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('formats') }}</h1>
    <p>{{ $t('formats_desc') }}</p>
  </BContainer>

  <BContainer size="m" v-if="formats && formats.length > 0">
    <FormatShow
      v-for="item in formats"
      :key="item.id"
      :item="item"
      :isAdmin="user?.isAdmin ?? false"
    />
  </BContainer>

  <BContainer size="m" v-if="user?.isAdmin ?? false">
    <FormatCreate @created="listFormats" />
  </BContainer>
</template>
