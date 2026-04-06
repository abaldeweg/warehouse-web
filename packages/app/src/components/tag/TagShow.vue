<script setup lang="ts">
import { useTag } from '@/composables/tags/useTag.js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Tag } from '@/types/model/tag'

interface Props {
  tag: Tag
  isAdmin: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()

const name = ref(props.tag.name)

const { updateTag, removeTag } = useTag()
</script>

<template>
  <BList divider v-if="tag">
    <template #title>
      <span v-if="!isAdmin">{{ tag.name }}</span>

      <BForm @submit.prevent="updateTag(tag.id, name)" v-if="isAdmin">
        <BInput
          v-model="name"
          type="text"
          name="name"
          id="name"
          :label="t('tag_name')"
          hideLabel
          class="editForm_input"
          @input="updateTag(tag.id, name)"
        />
      </BForm>
    </template>

    <template #controls>
      <BDropdown v-if="isAdmin">
        <template #selector>
          <BMaterialIcon :style="{ cursor: 'pointer' }">more_vert</BMaterialIcon>
        </template>
        <BDropdownItem icon="delete" @click="removeTag(tag.id)">
          {{ $t('delete_item') }}
        </BDropdownItem>
      </BDropdown>
    </template>
  </BList>
</template>
