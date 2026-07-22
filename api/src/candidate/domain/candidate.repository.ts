import { Candidate } from '@/candidate/domain/candidate.entity'

export abstract class CandidateRepository {
  abstract save(candidate: Candidate): Promise<void>
  abstract findAll(): Promise<Candidate[]>
  abstract findOneById(candidate_id: string): Promise<Candidate | null>
  abstract deleteById(candidate_id: string): Promise<void>
}
