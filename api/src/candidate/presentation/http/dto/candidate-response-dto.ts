export class CandidateResponseDto {
  constructor(
    public readonly id: string,
    public readonly full_name: string,
    public readonly email: string,
    public readonly resume_link: string,
    public readonly created_at: Date,
  ) {}
}
