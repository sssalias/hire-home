import type { ApiErrorCode } from '@/shared/api/errors/api-error-code.ts'

export type ApiErrorResponse = {
  code: ApiErrorCode
  message: string
}
