import { DomainError } from '@/auth/domain/errors/domain.error'
import { DomainErrorCode } from '@/auth/domain/errors/domain.error-code.enum'

export class WrongCredentialsError extends DomainError {
  readonly code = DomainErrorCode.WRONG_CREDENTIALS

  constructor() {
    super(`Неверный пароль!`)
  }
}
