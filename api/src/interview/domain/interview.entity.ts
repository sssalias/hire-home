import { InterviewMember } from '@/interview/domain/interview-member.entity'
import { uuidv7 } from 'uuidv7'

export enum InterviewStatus {
  scheduled = 'scheduled',
  started = 'started',
  completed = 'completed',
  canceled = 'canceled',
}

export class Interview {
  constructor(
    private readonly _id: string,
    private readonly _topic: string,
    private readonly _status: InterviewStatus,
    private readonly _createdAt: Date,
    private readonly _scheduleAt: Date,
    private readonly _members: InterviewMember[],
    private readonly _startedAt?: Date,
    private readonly _completedAt?: Date,
  ) {}

  static create(topic: string, scheduledAt: Date, members: InterviewMember[]) {
    const currentDate = new Date()
    return new Interview(
      uuidv7(),
      topic,
      InterviewStatus.scheduled,
      currentDate,
      scheduledAt,
      members,
    )
  }

  static restore(
    id: string,
    topic: string,
    status: InterviewStatus,
    createdAt: Date,
    scheduledAt: Date,
    members: InterviewMember[],
    startedAt: Date | undefined,
    completedAt: Date | undefined,
  ) {
    return new Interview(id, topic, status, createdAt, scheduledAt, members, startedAt, completedAt)
  }

  get id() {
    return this._id
  }

  get topic() {
    return this._topic
  }

  get status() {
    return this._status
  }

  get scheduleAt() {
    return this._scheduleAt
  }

  get members() {
    return this._members
  }

  get createdAt() {
    return this._createdAt
  }

  get startedAt() {
    return this._startedAt
  }

  get completedAt() {
    return this._completedAt
  }
}
