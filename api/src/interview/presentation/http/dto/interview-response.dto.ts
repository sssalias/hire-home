import { InterviewStatus } from '@/interview/domain/interview.entity'

export class InterviewResponseDto {
  constructor(
    public readonly id: string,
    public readonly candidateId: string,
    public readonly topic: string,
    public readonly status: InterviewStatus,
    public readonly created_at: Date,
    public readonly schedule_at: Date,
    public readonly started_at: Date | null,
    public readonly completed_at: Date | null,
  ) {}
}
