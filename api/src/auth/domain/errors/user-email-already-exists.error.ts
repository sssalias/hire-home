import { DomainError } from '@/auth/domain/errors/domain.error'
import { DomainErrorCode } from '@/auth/domain/errors/domain.error-code.enum'

export class UserEmailAlreadyExistsError extends DomainError {
  readonly code = DomainErrorCode.USER_EMAIL_ALREADY_EXISTS

  constructor(email: string) {
    super(`Пользователь с email = ${email} уже существует!`)
  }
}
