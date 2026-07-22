import { CreateInterviewDto } from '@/interview/presentation/http/dto/create-interview.dto'
import {
  CreateInterviewCommand,
  CreateInterviewMemberData,
} from '@/interview/application/create-interview/create-interview.command'

export class CreateInterviewCommandMapper {
  static toCommand(dto: CreateInterviewDto): CreateInterviewCommand {
    const { candidateId, topic, schedule_at, members } = dto
    const createInterviewMembersData = members.map(
      ({ user_id, role }) => new CreateInterviewMemberData(user_id, role),
    )

    return new CreateInterviewCommand(
      candidateId,
      topic,
      new Date(schedule_at),
      createInterviewMembersData,
    )
  }
}
