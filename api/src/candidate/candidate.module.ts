import { Module } from '@nestjs/common'
import { CandidateController } from './presentation/http/candidate.controller'
import { CandidateRepository } from '@/candidate/domain/candidate.repository'
import { PgCandidateRepositoryImpl } from '@/candidate/infrastucture/database/pg/pg-candidate-repository-impl'
import { CreateCandidateUseCase } from '@/candidate/application/create-candidate/create-candidate.use-case'
import { GetAllCandidatesUseCase } from '@/candidate/application/get-all-candidates/get-all-candidates.use-case'
import { GetOneCandidateUseCase } from '@/candidate/application/get-one-candidate/get-one-candidate.use-case'
import { DeleteCandidateUseCase } from '@/candidate/application/delete-candidate/delete-candidate.use-case'

@Module({
  controllers: [CandidateController],
  providers: [
    {
      provide: CandidateRepository,
      useClass: PgCandidateRepositoryImpl,
    },
    CreateCandidateUseCase,
    GetAllCandidatesUseCase,
    GetOneCandidateUseCase,
    DeleteCandidateUseCase,
  ],
})
export class CandidateModule {}
