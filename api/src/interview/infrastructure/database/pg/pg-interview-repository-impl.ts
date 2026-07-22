import { Injectable } from '@nestjs/common'
import { InterviewRepository } from '@/interview/domain/interview.repository'
import { Interview } from '@/interview/domain/interview.entity'
import { DatabaseService } from '@/database/database.service'

@Injectable()
export class PgInterviewRepositoryImpl implements InterviewRepository {
  constructor(private readonly db: DatabaseService) {}

  private static readonly INSERT_INTERVIEW_SQL = `INSERT INTO interviews (id, topic, status, created_at, schedule_at, started_at, completed_at)
                                                          VALUES ($1, $2, $3, $4, $5, $6, $7)`

  private static readonly INSERT_INTERVIEW_MEMBER_SQL = `INSERT INTO interview_members (id, interview_id, user_id, role) VALUES ($1, $2, $3, $4)`

  private static readonly SELECT_INTERVIEW_MEMBERS_BY_INTERVIEW_ID = `SELECT * FROM interview_members WHERE interview_id = $1`

  async save(interview: Interview): Promise<void> {
    const { id, topic, status, members, scheduleAt, startedAt, createdAt, completedAt } = interview

    await this.db.transaction(async (client) => {
      await client.query(PgInterviewRepositoryImpl.INSERT_INTERVIEW_SQL, [
        id,
        topic,
        status,
        createdAt,
        scheduleAt,
        startedAt ?? null,
        completedAt ?? null,
      ])
      await Promise.all(
        members.map((member) =>
          client.query(PgInterviewRepositoryImpl.INSERT_INTERVIEW_MEMBER_SQL, [
            member.id,
            id,
            member.userId,
            member.role,
          ]),
        ),
      )
    })
  }
}
