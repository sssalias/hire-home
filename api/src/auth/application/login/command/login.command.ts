export class LoginCommand {
  constructor(
    private readonly _email: string,
    private readonly _password: string,
  ) {}

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }
}
