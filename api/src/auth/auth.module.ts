import { Module } from '@nestjs/common'
import { AuthController } from './presentation/http/auth.controller'
import { RegisterUseCase } from '@/auth/application/register/use-case/register.use-case'
import { HashService } from '@/auth/infrastructure/bcrypt/hash.service'
import { UsersModule } from '@/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from '@/auth/infrastructure/jwt/token.service'
import { LoginUseCase } from '@/auth/application/login/use-case/login.use-case'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'тест',
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [AuthController],
  providers: [TokenService, HashService, RegisterUseCase, LoginUseCase],
})
export class AuthModule {}
