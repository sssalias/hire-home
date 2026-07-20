import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { TokenService } from '@/auth/infrastructure/jwt/token.service'
import { HashService } from '@/auth/infrastructure/bcrypt/hash.service'
import { UserRepository } from '@/users/domain/user.repository'
import { LoginCommand } from '@/auth/application/login/command/login.command'

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly hashService: HashService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginCommand): Promise<string> {
    const { email, password } = command

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundException('Пользователь с таким email не найден!')
    }

    const isValidPassword = await this.hashService.compare(password, user.passwordHash)

    if (!isValidPassword) {
      throw new BadRequestException('Неверный пароль!')
    }

    return await this.tokenService.createAccessToken(user)
  }
}
