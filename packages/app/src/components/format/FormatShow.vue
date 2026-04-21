<script setup lang="ts">
import { useFormat } from '@/composables/formats/useFormat.js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Format } from '@/types/model/format'

interface Props {
  format: Format
  isAdmin: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()

const name = ref(props.format.name)
const hide = ref<boolean>(false)

const { deleteSuccess, deleteError, updateFormat, updateFormatDebounced, removeFormat } = useFormat()
</script>

<template>
  <BList v-if="deleteSuccess && !hide">
    <template #title>
      <span :style="{ textTransform: 'uppercase' }">{{ t('deleted') }}</span>
    </template>
    <template #controls>
      <BMaterialIcon @click="hide = true" :style="{ cursor: 'pointer' }">close</BMaterialIcon>
    </template>
  </BList>

  <BList divider v-if="!deleteSuccess && format">
    <template #title>
      <span v-if="!isAdmin">{{ format.name }}</span>

      <BForm @submit.prevent="updateFormat(format.id, name)" v-if="isAdmin">
        <BInput
          v-model="name"
          type="text"
          name="name"
          id="name"
          :label="t('format_name')"
          hideLabel
          @input="updateFormatDebounced(format.id, name)"
        />
      </BForm>
    </template>

    <template #controls>
      <BDropdown v-if="isAdmin">
        <template #selector>
          <BMaterialIcon :style="{ cursor: 'pointer' }">more_vert</BMaterialIcon>
        </template>
        <BDropdownItem icon="delete" @click="removeFormat(format.id)">
          {{ $t('delete_format') }}
        </BDropdownItem>
      </BDropdown>
    </template>
  </BList>

  <BDialog v-model="deleteError">
    <p>{{ $t('format_delete_error') }}</p>
    <template #actions>
      <BButton @click="deleteError = false">{{ $t('close') }}</BButton>
    </template>
  </BDialog>
</template>
