import { IsString } from 'class-validator'

export class CreateCandidateDto {
  @IsString()
  full_name: string

  @IsString()
  email: string

  @IsString()
  resume_link: string
}
