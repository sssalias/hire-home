import { InterviewReadModel } from '@/interview/application/get-user-interviews/models/interview.read-model'
import { GetUserInterviewsCommand } from '@/interview/application/get-user-interviews/get-user-interviews.command'
import { Injectable } from '@nestjs/common'
import { InterviewQuery } from '@/interview/application/get-user-interviews/interview.query'

@Injectable()
export class GetUserInterviewsUseCase {
  constructor(private readonly interviewQuery: InterviewQuery) {}
  async execute(command: GetUserInterviewsCommand): Promise<InterviewReadModel[]> {
    const { userId } = command
    return await this.interviewQuery.findAllByUserId(userId)
  }
}
