<template>
  <UiDropdown direction="left">
    <template #trigger>
      <UiButton variant="primary" icon-only>
        <UserRoundIcon />
      </UiButton>
    </template>
    <template #content>
      <div class="user-info">
        <table class="user-info-table">
          <tbody>
            <tr>
              <td class="user-info-table-head">Имя</td>
              <td class="user-info-table-value">{{ userName }}</td>
            </tr>
            <tr>
              <td class="user-info-table-head">email</td>
              <td class="user-info-table-value">{{ user?.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer>
      <UiButton @click="open" size="sm" full variant="danger" icon>
        <span>Выйти</span>
        <ArrowRightIcon :size="16" />
      </UiButton>
    </template>
  </UiDropdown>
  <UiConfirmModal message="выйти" :is-open="isOpen" :close="close" :cb="onLogout" />
</template>

<script setup lang="ts">
import { UiButton, UiConfirmModal, UiDropdown } from '@/shared/ui'
import { useAuth } from '@/features/auth/composable/use-auth.ts'
import { UserRoundIcon, ArrowRightIcon } from 'lucide-vue-next'
import router from '@/app/router'
import { computed } from 'vue'
import { useDisclosure } from '@/shared/composable'

const { getUser, logout } = useAuth()

const { isOpen, open, close } = useDisclosure()

const onLogout = async () => {
  logout()
  await router.push({ name: 'login' })
}

const userName = computed(() => {
  const userNameSplit = user.value?.full_name.split(' ')
  return `${userNameSplit?.at(0)} ${userNameSplit?.at(1)}`
})

const { data: user } = getUser()
</script>

<style scoped>
.user-info-table {
  font-size: var(--font-size-sm);
  border-spacing: var(--space-2);
}
.user-info-table-head {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
.user-info-table-value {
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
}
</style>
