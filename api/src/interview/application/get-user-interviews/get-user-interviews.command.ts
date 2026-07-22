export class GetUserInterviewsCommand {
  constructor(private readonly _userId: string) {}

  get userId() {
    return this._userId
  }
}
