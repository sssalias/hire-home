import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { DomainError } from '@/auth/domain/errors/domain.error'
import { Response } from 'express'
import { DomainErrorCode } from '@/auth/domain/errors/domain.error-code.enum'

const ErrorStatusMap: Record<DomainErrorCode, HttpStatus> = {
  [DomainErrorCode.USER_EMAIL_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [DomainErrorCode.WRONG_CREDENTIALS]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.PASSWORD_AND_PASSWORD_REPEAT_NOT_EQUALS]: HttpStatus.BAD_REQUEST,
}

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): any {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    const status = ErrorStatusMap[exception.code]

    response.status(status).json({
      code: exception.code,
      error: exception.name,
      message: exception.message,
    })
  }
}
