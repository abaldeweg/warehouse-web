<template>
  <div class="toolbar">
    <div class="toolbar_group"><slot name="left"></slot></div>
    <div class="toolbar_group"><slot name="right"></slot></div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--color-neutral-02);
  border-radius: 20px;
  padding: 20px;
}

.toolbar_group {
  display: flex;
  gap: 20px;
  align-items: center;
}

@media print {
  .toolbar {
    display: none;
  }
}
</style>
