<template>
  <main class="main">
    <section class="register-section">
      <h1 class="register-headline">Регситрация</h1>
      <RegisterForm />
    </section>
  </main>
</template>

<script setup lang="ts">
import { RegisterForm } from '@/features/auth'
</script>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  background-color: var(--color-surface);
}

.register-section {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
}

.register-headline {
  color: var(--color-text-primary);
}
</style>
