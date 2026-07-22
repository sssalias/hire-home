import { Module } from '@nestjs/common'
import { InterviewController } from './presentation/http/interview.controller'
import { InterviewRepository } from '@/interview/domain/interview.repository'
import { PgInterviewRepositoryImpl } from '@/interview/infrastructure/database/pg/pg-interview-repository-impl'
import { CreateInterviewUseCase } from '@/interview/application/create-interview/create-interview.use-case'

@Module({
  controllers: [InterviewController],
  providers: [
    {
      provide: InterviewRepository,
      useClass: PgInterviewRepositoryImpl,
    },
    CreateInterviewUseCase,
  ],
})
export class InterviewModule {}
