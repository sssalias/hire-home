export class CreateCandidateCommand {
  constructor(
    private readonly _fullName: string,
    private readonly _email: string,
    private readonly _resumeLink: string,
  ) {}

  get fullName() {
    return this._fullName
  }

  get email() {
    return this._email
  }

  get resumeLink() {
    return this._resumeLink
  }
}
