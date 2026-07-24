<template>
  <main class="main">
    <section class="login-section">
      <h1 class="login-headline">Авторизация</h1>
      <LoginForm />
    </section>
  </main>
</template>

<script setup lang="ts">
import { LoginForm } from '@/features/auth'
</script>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  background-color: var(--color-surface);
}

.login-section {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
}

.login-headline {
  color: var(--color-text-primary);
}
</style>
