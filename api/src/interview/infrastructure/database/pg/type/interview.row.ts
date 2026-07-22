import { InterviewStatus } from '@/interview/domain/interview.entity'

export type InterviewRow = {
  id: string
  candidate_id: string
  topic: string
  status: InterviewStatus
  created_at: string
  schedule_at: string
  started_at: string
  completed_at: string
}
