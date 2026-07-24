import { DomainError } from '@/auth/domain/errors/domain.error'
import { DomainErrorCode } from '@/auth/domain/errors/domain.error-code.enum'

export class PasswordAndPasswordRepeatNotEquals extends DomainError {
  readonly code = DomainErrorCode.PASSWORD_AND_PASSWORD_REPEAT_NOT_EQUALS
  constructor() {
    super('Пароли не совпадают!')
  }
}
