import { DomainErrorCode } from '@/auth/domain/errors/domain.error-code.enum'

export abstract class DomainError extends Error {
  abstract readonly code: DomainErrorCode

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
