export class DeleteCandidateCommand {
  constructor(private readonly _candidateId: string) {}

  get candidateId() {
    return this._candidateId
  }
}
