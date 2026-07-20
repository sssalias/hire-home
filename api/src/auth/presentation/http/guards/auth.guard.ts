import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { TokenService } from '@/auth/infrastructure/jwt/token.service'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '@/auth/presentation/http/decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeaders(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      request.user = await this.tokenService.validateAccessToken(token)
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeaders(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
