import { IsArray, IsDateString, IsString, IsUUID, ValidateNested } from 'class-validator'
import { CreateInterviewMemberDto } from '@/interview/presentation/http/dto/create-interview-member.dto'
import { Type } from 'class-transformer'

export class CreateInterviewDto {
  @IsUUID('7')
  candidateId: string

  @IsString()
  topic: string

  @IsDateString()
  schedule_at: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInterviewMemberDto)
  members: CreateInterviewMemberDto[]
}
