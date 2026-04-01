<template>
  <BButton design="outline_danger" @click="$emit('clean')">
    {{ $t('clean_books') }}
  </BButton>
</template>
