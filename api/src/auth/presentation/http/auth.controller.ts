import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { RegisterDto } from '@/auth/presentation/http/dto/register.dto'
import { RegisterUseCase } from '@/auth/application/register/use-case/register.use-case'
import { RegisterCommand } from '@/auth/application/register/command/register.command'
import { LoginDto } from '@/auth/presentation/http/dto/login.dto'
import { LoginUseCase } from '@/auth/application/login/use-case/login.use-case'
import { LoginCommand } from '@/auth/application/login/command/login.command'
import { TokenResponseDto } from '@/auth/presentation/http/dto/token-response.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('/register')
  async register(@Body() dto: RegisterDto): Promise<TokenResponseDto> {
    const { email, password, password_repeat, full_name } = dto
    if (password != password_repeat) {
      throw new BadRequestException('Пароли не совпадают!')
    }
    const access_token = await this.registerUseCase.execute(
      new RegisterCommand(email, password, full_name),
    )
    return new TokenResponseDto(access_token)
  }

  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<TokenResponseDto> {
    const { email, password } = dto

    const access_token = await this.loginUseCase.execute(new LoginCommand(email, password))
    return new TokenResponseDto(access_token)
  }
}
