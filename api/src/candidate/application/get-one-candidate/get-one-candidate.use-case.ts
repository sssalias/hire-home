import { Injectable } from '@nestjs/common'
import { CandidateRepository } from '@/candidate/domain/candidate.repository'
import { GetOneCandidateCommand } from '@/candidate/application/get-one-candidate/get-one-candidate.command'

@Injectable()
export class GetOneCandidateUseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async execute(command: GetOneCandidateCommand) {
    const { candidateId } = command
    return await this.candidateRepository.findOneById(candidateId)
  }
}
