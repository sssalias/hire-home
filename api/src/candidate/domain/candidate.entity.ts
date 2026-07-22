import { uuidv7 } from 'uuidv7'

export class Candidate {
  constructor(
    private readonly _id: string,
    private readonly _fullName: string,
    private readonly _email: string,
    private readonly _resumeLink: string,
    private readonly _createdAt: Date,
  ) {}

  static create(fullName: string, email: string, resumeLink: string) {
    return new Candidate(uuidv7(), fullName, email, resumeLink, new Date())
  }

  static restore(id: string, fullName: string, email: string, resumeLink: string, createdAt: Date) {
    return new Candidate(id, fullName, email, resumeLink, createdAt)
  }

  get id() {
    return this._id
  }

  get fullName() {
    return this._fullName
  }

  get email() {
    return this._email
  }

  get resumeLink() {
    return this._resumeLink
  }

  get createdAt() {
    return this._createdAt
  }
}
