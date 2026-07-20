export class RegisterCommand {
  constructor(
    private readonly _email: string,
    private readonly _password: string,
    private readonly _fullName: string,
  ) {}

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get fullName() {
    return this._fullName
  }
}
