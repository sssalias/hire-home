import { Candidate } from '@/candidate/domain/candidate.entity'
import { CandidateResponseDto } from '@/candidate/presentation/http/dto/candidate-response-dto'

export class CandidateToResponseDtoMapper {
  static toDto(candidate: Candidate): CandidateResponseDto {
    const { id, fullName, email, resumeLink, createdAt } = candidate
    return new CandidateResponseDto(id, fullName, email, resumeLink, createdAt)
  }

  static toArrayDto(candidates: Candidate[]): CandidateResponseDto[] {
    return candidates.map((candidate) => CandidateToResponseDtoMapper.toDto(candidate))
  }
}
