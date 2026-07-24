import { Body, Controller, Get, Post } from '@nestjs/common'
import { RegisterDto } from '@/auth/presentation/http/dto/register.dto'
import { RegisterUseCase } from '@/auth/application/register/use-case/register.use-case'
import { RegisterCommand } from '@/auth/application/register/command/register.command'
import { LoginDto } from '@/auth/presentation/http/dto/login.dto'
import { LoginUseCase } from '@/auth/application/login/use-case/login.use-case'
import { LoginCommand } from '@/auth/application/login/command/login.command'
import { TokenResponseDto } from '@/auth/presentation/http/dto/token-response.dto'
import { Public } from '@/auth/presentation/http/decorators/public.decorator'
import { Jwt } from '@/auth/presentation/http/guards/jwt-payload.decorator'
import { type JwtPayload } from '@/auth/infrastructure/jwt/types/jwt-payload'
import { MeUseCase } from '@/auth/application/me/use-case/me.use-case'
import { MeCommand } from '@/auth/application/me/command/me.command'
import { MeResponseDto } from '@/auth/presentation/http/dto/me-response.dto'
import { PasswordAndPasswordRepeatNotEquals } from '@/auth/domain/errors/password-and-password-repeat-not-equals'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly meUseCase: MeUseCase,
  ) {}

  @Public()
  @Post('/register')
  async register(@Body() dto: RegisterDto): Promise<TokenResponseDto> {
    const { email, password, password_repeat, full_name } = dto
    if (password != password_repeat) {
      throw new PasswordAndPasswordRepeatNotEquals()
    }
    const access_token = await this.registerUseCase.execute(
      new RegisterCommand(email, password, full_name),
    )
    return new TokenResponseDto(access_token)
  }

  @Public()
  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<TokenResponseDto> {
    const { email, password } = dto

    const access_token = await this.loginUseCase.execute(new LoginCommand(email, password))
    return new TokenResponseDto(access_token)
  }

  @Get('me')
  async me(@Jwt() payload: JwtPayload) {
    const { sub } = payload
    const { id, email, fullName } = await this.meUseCase.execute(new MeCommand(sub))
    return new MeResponseDto(id, email, fullName)
  }
}
