<template>
  <header class="header">
    <UiContainer class="header-container">
      <div class="header-wrapper">
        <UiLogo />
        <nav class="header-navigation">
          <div class="header-navigation-links">
            <UiLink path="candidates">Кандидаты</UiLink>
          </div>
          <div class="header-navigation-utils">
            <UserBadge />
            <UiThemeSwitcher />
          </div>
        </nav>
      </div>
    </UiContainer>
  </header>
</template>

<script setup lang="ts">
import { UserBadge } from '@/features/auth'
import { UiContainer, UiLink, UiLogo, UiThemeSwitcher } from '@/shared/ui'
</script>

<style scoped>
.header {
  height: var(--header-height);
  width: 100%;
  box-shadow: var(--shadow-md);
  background-color: var(--color-surface-secondary);
}

.header-wrapper {
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-navigation {
  display: flex;
  align-items: center;
  gap: var(--space-12);
}

.header-navigation-utils {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
</style>
