export class GetOneCandidateCommand {
  constructor(private readonly _candidateId: string) {}

  get candidateId() {
    return this._candidateId
  }
}
