<template>
  <div class="login-form-wrapper">
    <form class="login-form" @submit="onSubmit">
      <UiField type="email" label="E-mail" v-model="email" v-bind="emailAttrs" />
      <UiField type="password" label="Пароль" v-model="password" v-bind="passwordAttrs" />
      <p v-if="formError" class="login-form-error" role="alert">{{ formError }}</p>
      <UiButton type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Входим...' : 'Войти' }}
      </UiButton>
    </form>
    <span class="login-register-link"
      >Еще нет аккаунта? <UiLink path="register">Зарегистрироваться</UiLink>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { UiField, UiLink, UiButton } from '@/shared/ui'
import { useAuth } from '@/features/auth/composable/use-auth.ts'
import router from '@/app/router'
import { ApiError } from '@/shared/api/errors'

const { defineField, handleSubmit, isSubmitting } = useForm()

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const { login } = useAuth()
const formError = ref('')

const onSubmit = handleSubmit(async (values) => {
  try {
    await login({ email: values.email, password: values.password })
    await router.push({ path: '/' })
  } catch (error) {
    formError.value =
      error instanceof ApiError ? error.message : 'Не удалось выполнить вход. Попробуйте позже.'
  }
})
</script>

<style scoped>
.login-form-wrapper {
  width: 500px;
  border-radius: var(--radius-xl);
  background-color: var(--color-surface-secondary);
  padding: 40px 25px;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
}

.login-form-error {
  border-radius: var(--radius-sm);
  background-color: rgba(220, 38, 38, 0.08);
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  padding: var(--space-3);
}

.login-register-link {
  font-size: var(--font-size-md);
  margin-top: auto;
  color: var(--color-text-primary);
}
</style>
