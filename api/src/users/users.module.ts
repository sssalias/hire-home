import { Module } from '@nestjs/common'
import { PgUserRepositoryImpl } from '@/users/infrastructure/database/pg/pg-user-repository-impl'
import { UserRepository } from '@/users/domain/user.repository'

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PgUserRepositoryImpl,
    },
  ],
  exports: [UserRepository],
})
export class UsersModule {}
