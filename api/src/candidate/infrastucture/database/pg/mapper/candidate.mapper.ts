import { CandidateRow } from '@/candidate/infrastucture/database/pg/type/candidate.row'
import { Candidate } from '@/candidate/domain/candidate.entity'

export class CandidateMapper {
  static toDomain(row: CandidateRow): Candidate {
    const { id, full_name, email, resume_link, created_at } = row
    return Candidate.restore(id, full_name, email, resume_link, new Date(created_at))
  }

  static toArrayDomain(rows: CandidateRow[]): Candidate[] {
    return rows.map(({ id, full_name, email, resume_link, created_at }) =>
      Candidate.restore(id, full_name, email, resume_link, new Date(created_at)),
    )
  }

  static toRow(domain: Candidate): CandidateRow {
    const { id, fullName, email, resumeLink, createdAt } = domain
    return {
      id: id,
      full_name: fullName,
      email: email,
      resume_link: resumeLink,
      created_at: createdAt.toISOString(),
    }
  }
}
