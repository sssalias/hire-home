import { Global, Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { PG_POOL } from '@/database/database.constants'
import { Pool } from 'pg'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PG_POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new Pool({
          host: config.get<string>('PG_HOST'),
          port: config.get<number>('PG_PORT'),
          user: config.get<string>('PG_USER'),
          password: config.get<string>('PG_PASSWORD'),
          database: config.get<string>('PG_DATABASE'),
        })
      },
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
