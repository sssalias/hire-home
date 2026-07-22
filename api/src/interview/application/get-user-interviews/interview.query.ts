import { InterviewReadModel } from '@/interview/application/get-user-interviews/models/interview.read-model'

export abstract class InterviewQuery {
  abstract findAllByUserId(userId: string): Promise<InterviewReadModel[]>
}
