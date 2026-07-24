<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import '@/app/assets/css/zero.css'
import '@/app/assets/css/base.css'
import { onMounted } from 'vue'
import { httpClient } from '@/shared/api/http-client.ts'

onMounted(async () => {
  await httpClient.get('/auth/me')
})
</script>

<style scoped></style>
