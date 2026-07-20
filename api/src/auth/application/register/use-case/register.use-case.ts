import { ConflictException, Injectable } from '@nestjs/common'
import { RegisterCommand } from '@/auth/application/register/command/register.command'
import { HashService } from '@/auth/infrastructure/bcrypt/hash.service'
import { TokenService } from '@/auth/infrastructure/jwt/token.service'
import { UserRepository } from '@/users/domain/user.repository'
import { User } from '@/users/domain/user.entity'

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(command: RegisterCommand): Promise<string> {
    const { email, fullName, password } = command
    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует!')
    }

    const passwordHash = await this.hashService.hash(password)

    const user = User.create(email, fullName, passwordHash)

    await this.userRepository.save(user)

    return await this.tokenService.createAccessToken(user)
  }
}
