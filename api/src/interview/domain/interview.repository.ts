import { Interview } from '@/interview/domain/interview.entity'

export abstract class InterviewRepository {
  abstract save(interview: Interview): Promise<void>
  // abstract findAllByUserId(userId: string): Promise<Interview[]>
}
