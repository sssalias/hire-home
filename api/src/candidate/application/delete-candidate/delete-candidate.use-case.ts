import { Injectable } from '@nestjs/common'
import { CandidateRepository } from '@/candidate/domain/candidate.repository'
import { DeleteCandidateCommand } from '@/candidate/application/delete-candidate/delete-candidate.command'

@Injectable()
export class DeleteCandidateUseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async execute(command: DeleteCandidateCommand) {
    const { candidateId } = command
    await this.candidateRepository.deleteById(candidateId)
  }
}
