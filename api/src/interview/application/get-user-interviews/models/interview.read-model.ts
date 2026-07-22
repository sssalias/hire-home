import { InterviewStatus } from '@/interview/domain/interview.entity'

export class InterviewReadModel {
  constructor(
    private readonly _id: string,
    private readonly _candidateId: string,
    private readonly _topic: string,
    private readonly _status: InterviewStatus,
    private readonly _createdAt: Date,
    private readonly _scheduleAt: Date,
    private readonly _startedAt: Date,
    private readonly _completedAt: Date,
  ) {}

  get id() {
    return this._id
  }

  get candidateId() {
    return this._candidateId
  }

  get topic() {
    return this._topic
  }

  get status() {
    return this._status
  }

  get createdAt() {
    return this._createdAt
  }

  get scheduleAt() {
    return this._scheduleAt
  }

  get startedAt() {
    return this._startedAt
  }

  get completedAt() {
    return this._completedAt
  }
}
