import { Injectable } from '@nestjs/common'
import { InterviewRepository } from '@/interview/domain/interview.repository'
import { CreateInterviewCommand } from '@/interview/application/create-interview/create-interview.command'
import { Interview } from '@/interview/domain/interview.entity'
import { InterviewMember } from '@/interview/domain/interview-member.entity'

@Injectable()
export class CreateInterviewUseCase {
  constructor(private readonly interviewRepository: InterviewRepository) {}
  async execute(command: CreateInterviewCommand) {
    const { candidateId, topic, scheduleAt, members } = command
    const interviewMembers = members.map((member) =>
      InterviewMember.create(member.userId, member.role),
    )
    const interview = Interview.create(candidateId, topic, scheduleAt, interviewMembers)
    return await this.interviewRepository.save(interview)
  }
}
