import { MeCommand } from '@/auth/application/me/command/me.command'
import { UserRepository } from '@/users/domain/user.repository'
import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '@/users/domain/user.entity'

@Injectable()
export class MeUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: MeCommand): Promise<User> {
    const { id } = command
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new BadRequestException('Пользователь с таким id не найден!')
    }

    return user
  }
}
