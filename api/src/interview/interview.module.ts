import { Module } from '@nestjs/common'
import { InterviewController } from './presentation/http/interview.controller'
import { InterviewRepository } from '@/interview/domain/interview.repository'
import { PgInterviewRepositoryImpl } from '@/interview/infrastructure/database/pg/pg-interview-repository-impl'
import { CreateInterviewUseCase } from '@/interview/application/create-interview/create-interview.use-case'
import { InterviewQuery } from '@/interview/application/get-user-interviews/interview.query'
import { PgInterviewQueryImpl } from '@/interview/infrastructure/database/pg/pg-interview-query-impl'
import { GetUserInterviewsUseCase } from '@/interview/application/get-user-interviews/get-user-interviews.use-case'

@Module({
  controllers: [InterviewController],
  providers: [
    {
      provide: InterviewRepository,
      useClass: PgInterviewRepositoryImpl,
    },
    {
      provide: InterviewQuery,
      useClass: PgInterviewQueryImpl,
    },
    CreateInterviewUseCase,
    GetUserInterviewsUseCase,
  ],
})
export class InterviewModule {}
