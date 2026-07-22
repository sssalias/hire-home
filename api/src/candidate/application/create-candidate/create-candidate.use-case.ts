import { Injectable } from '@nestjs/common'
import { CandidateRepository } from '@/candidate/domain/candidate.repository'
import { CreateCandidateCommand } from '@/candidate/application/create-candidate/create-candidate.command'
import { Candidate } from '@/candidate/domain/candidate.entity'

@Injectable()
export class CreateCandidateUseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}
  async execute(command: CreateCandidateCommand): Promise<void> {
    const { fullName, email, resumeLink } = command
    const candidate = Candidate.create(fullName, email, resumeLink)
    await this.candidateRepository.save(candidate)
  }
}
