import { uuidv7 } from 'uuidv7'

export class User {
  private constructor(
    private readonly _id: string,
    private readonly _email: string,
    private readonly _fullName: string,
    private readonly _passwordHash: string,
  ) {}

  get id() {
    return this._id
  }

  get email() {
    return this._email
  }

  get fullName() {
    return this._fullName
  }

  get passwordHash() {
    return this._passwordHash
  }

  static create(email: string, fullName: string, passwordHash: string) {
    return new User(uuidv7(), email, fullName, passwordHash)
  }

  static restore(id: string, email: string, fullName: string, passwordHash: string) {
    return new User(id, email, fullName, passwordHash)
  }
}
