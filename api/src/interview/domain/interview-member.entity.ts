import { uuidv7 } from 'uuidv7'

export enum MemberRole {
  member = 'member',
  moderator = 'moderator',
}

export class InterviewMember {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _role: MemberRole,
  ) {}

  static create(userId: string, role: MemberRole) {
    return new InterviewMember(uuidv7(), userId, role)
  }

  static restore(id: string, userId: string, role: MemberRole) {
    return new InterviewMember(id, userId, role)
  }

  get id() {
    return this._id
  }

  get userId() {
    return this._userId
  }

  get role() {
    return this._role
  }
}
