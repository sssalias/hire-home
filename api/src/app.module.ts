import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from '@/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { InterviewModule } from './interview/interview.module';
import { CandidateModule } from './candidate/candidate.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ envFilePath: '.env' }), UsersModule, AuthModule, InterviewModule, CandidateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
