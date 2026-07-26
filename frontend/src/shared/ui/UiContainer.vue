<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  width: var(--container-width);
  height: 100%;
  margin: 0 auto;
}
</style>
