import { Module } from '@nestjs/common'
import { AuthController } from './presentation/http/auth.controller'
import { RegisterUseCase } from '@/auth/application/register/use-case/register.use-case'
import { HashService } from '@/auth/infrastructure/bcrypt/hash.service'
import { UsersModule } from '@/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from '@/auth/infrastructure/jwt/token.service'
import { LoginUseCase } from '@/auth/application/login/use-case/login.use-case'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@/auth/presentation/http/guards/auth.guard'
import { MeUseCase } from '@/auth/application/me/use-case/me.use-case'

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
  providers: [
    TokenService,
    HashService,
    RegisterUseCase,
    LoginUseCase,
    MeUseCase,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
