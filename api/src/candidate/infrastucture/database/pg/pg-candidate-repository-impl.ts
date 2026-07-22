import { Injectable } from '@nestjs/common'
import { CandidateRepository } from '@/candidate/domain/candidate.repository'
import { DatabaseService } from '@/database/database.service'
import { Candidate } from '@/candidate/domain/candidate.entity'
import { CandidateRow } from '@/candidate/infrastucture/database/pg/type/candidate.row'
import { CandidateMapper } from '@/candidate/infrastucture/database/pg/mapper/candidate.mapper'

@Injectable()
export class PgCandidateRepositoryImpl implements CandidateRepository {
  constructor(private readonly db: DatabaseService) {}

  private static readonly INSERT_INTO_CANDIDATES_SQL = `INSERT INTO candidates (id, full_name, email, resume_link, created_at) values ($1, $2, $3, $4, $5)`

  private static readonly SELECT_ALL_CANDIDATES_SQL = `SELECT id, full_name, email, resume_link, created_at FROM candidates`
  private static readonly SELECT_BY_ID_CANDIDATES_SQL = `SELECT id, full_name, email, resume_link, created_at FROM candidates WHERE id = $1`
  private static readonly DELETE_BY_ID_CANDIDATES_SQL = `DELETE FROM candidates WHERE id = $1`

  async save(candidate: Candidate): Promise<void> {
    const { id, fullName, email, resumeLink, createdAt } = candidate
    await this.db.queryOne(PgCandidateRepositoryImpl.INSERT_INTO_CANDIDATES_SQL, [
      id,
      fullName,
      email,
      resumeLink,
      createdAt,
    ])
  }

  async findAll(): Promise<Candidate[]> {
    const candidateRows: CandidateRow[] = await this.db.query<CandidateRow>(
      PgCandidateRepositoryImpl.SELECT_ALL_CANDIDATES_SQL,
    )
    return CandidateMapper.toArrayDomain(candidateRows)
  }

  async findOneById(candidate_id: string): Promise<Candidate | null> {
    const candidateRow: CandidateRow | null = await this.db.queryOne<CandidateRow>(
      PgCandidateRepositoryImpl.SELECT_BY_ID_CANDIDATES_SQL,
      [candidate_id],
    )

    if (!candidateRow) {
      return null
    }

    return CandidateMapper.toDomain(candidateRow)
  }

  async deleteById(candidate_id: string) {
    await this.db.queryOne(PgCandidateRepositoryImpl.DELETE_BY_ID_CANDIDATES_SQL, [candidate_id])
  }
}
