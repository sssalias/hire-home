<template>
  <div class="register-form-wrapper">
    <form class="register-form" @submit="onSubmit">
      <UiField type="email" label="E-mail" v-model="email" v-bind="emailAttrs" />
      <UiField type="text" label="Полное имя" v-model="fullName" v-bind="fullNameAttrs" />
      <UiField type="password" label="Пароль" v-model="password" v-bind="passwordAttrs" />
      <UiField
        type="password"
        label="Повторите пароль"
        v-model="passwordRepeat"
        v-bind="passwordRepeatAttrs"
      />
      <p v-if="formError" class="register-form-error" role="alert">{{ formError }}</p>
      <UiButton type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Регистрируемся.' : 'Зарегестрироваться' }}
      </UiButton>
    </form>
    <span class="register-register-link"
      >Уже есть аккаунт? <UiLink path="/register">Войти</UiLink>
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
const [fullName, fullNameAttrs] = defineField('fullName')
const [password, passwordAttrs] = defineField('password')
const [passwordRepeat, passwordRepeatAttrs] = defineField('passwordRepeat')

const { register } = useAuth()
const formError = ref('')

const onSubmit = handleSubmit(async (values) => {
  try {
    await register({
      email: values.email,
      full_name: values.fullName,
      password: values.password,
      password_repeat: values.passwordRepeat,
    })
    await router.push({ path: '/' })
  } catch (error) {
    formError.value =
      error instanceof ApiError ? error.message : 'Не удалось выполнить вход. Попробуйте позже.'
  }
})
</script>

<style scoped>
.register-form-wrapper {
  height: 400px;
  width: 500px;
  border-radius: var(--radius-xl);
  background-color: var(--color-surface-secondary);
  padding: 40px 25px;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
}

.register-form-error {
  border-radius: var(--radius-sm);
  background-color: rgba(220, 38, 38, 0.08);
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  padding: var(--space-3);
}

.register-register-link {
  font-size: var(--font-size-md);
  margin-top: auto;
}
</style>
