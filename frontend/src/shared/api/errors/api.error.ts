import type { ApiErrorCode } from '@/shared/api/errors/api-error-code.ts'

export class ApiError extends Error {
  readonly code: ApiErrorCode
  constructor(message: string, code: ApiErrorCode) {
    super(message)
    this.code = code
  }
}
