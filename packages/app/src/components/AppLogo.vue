<script setup lang="ts">
const logo: string | null =
  import.meta.env.VITE_APP_LOGO !== 'false' ? import.meta.env.VITE_APP_LOGO : null
</script>

<template>
  <img :src="logo" alt="warehouse" v-if="logo" />
</template>
