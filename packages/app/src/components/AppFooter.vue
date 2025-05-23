<script setup lang="ts">
const about = import.meta.env.VITE_ABOUT
</script>

<template>
  <div class="footer">
    <BContainer size="m" v-html="about" />
  </div>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-neutral-02);
}
@media print {
  .footer {
    display: none;
  }
}
</style>
