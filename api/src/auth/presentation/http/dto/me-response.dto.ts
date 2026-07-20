export class MeResponseDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly full_name: string,
  ) {}
}
