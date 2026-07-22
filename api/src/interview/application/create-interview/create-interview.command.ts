import { MemberRole } from '@/interview/domain/interview-member.entity'

// export type CreateInterviewMemberData = {
//   userId: string
//   role: MemberRole
// }

export class CreateInterviewMemberData {
  constructor(
    private readonly _userId: string,
    private readonly _role: MemberRole,
  ) {}

  get userId() {
    return this._userId
  }

  get role() {
    return this._role
  }
}

export class CreateInterviewCommand {
  constructor(
    private readonly _candidateId: string,
    private readonly _topic: string,
    private readonly _scheduleAt: Date,
    private readonly _members: CreateInterviewMemberData[],
  ) {}

  get candidateId() {
    return this._candidateId
  }
  get topic() {
    return this._topic
  }

  get scheduleAt() {
    return this._scheduleAt
  }

  get members() {
    return this._members
  }
}
