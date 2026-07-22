import { InterviewQuery } from '@/interview/application/get-user-interviews/interview.query'
import { InterviewReadModel } from '@/interview/application/get-user-interviews/models/interview.read-model'
import { Injectable } from '@nestjs/common'
import { DatabaseService } from '@/database/database.service'
import { InterviewRow } from '@/interview/infrastructure/database/pg/type/interview.row'

@Injectable()
export class PgInterviewQueryImpl implements InterviewQuery {
  private static readonly SELECT_INTERVIEWS_BY_USER_ID_SQL = `SELECT i.* FROM interviews i JOIN interview_members im ON i.id = im.interview_id WHERE im.user_id = $1`

  constructor(private readonly db: DatabaseService) {}

  async findAllByUserId(userId: string): Promise<InterviewReadModel[]> {
    const userInterviewsRow = await this.db.query<InterviewRow>(
      PgInterviewQueryImpl.SELECT_INTERVIEWS_BY_USER_ID_SQL,
      [userId],
    )

    return userInterviewsRow.map(
      ({ id, topic, created_at, schedule_at, status, started_at, completed_at }) =>
        new InterviewReadModel(
          id,
          topic,
          status,
          new Date(created_at),
          new Date(schedule_at),
          new Date(started_at),
          new Date(completed_at),
        ),
    )
  }
}
