import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '@/auth/infrastructure/jwt/types/jwt-payload'
import { User } from '@/users/domain/user.entity'

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(user: User): Promise<string> {
    const { id, email, fullName } = user
    const payload: JwtPayload = { sub: id, email, full_name: fullName }
    return await this.jwtService.signAsync<JwtPayload>(payload)
  }

  async validateAccessToken(token: string): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync<JwtPayload>(token)
  }
}
