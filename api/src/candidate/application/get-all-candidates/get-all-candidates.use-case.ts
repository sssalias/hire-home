import { Candidate } from '@/candidate/domain/candidate.entity'
import { CandidateRepository } from '@/candidate/domain/candidate.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetAllCandidatesUseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}
  async execute(): Promise<Candidate[]> {
    return await this.candidateRepository.findAll()
  }
}
