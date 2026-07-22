import { IsArray, IsDateString, IsString, ValidateNested } from 'class-validator'
import { CreateInterviewMemberDto } from '@/interview/presentation/http/dto/create-interview-member.dto'
import { Type } from 'class-transformer'

export class CreateInterviewDto {
  @IsString()
  topic: string

  @IsDateString()
  schedule_at: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInterviewMemberDto)
  members: CreateInterviewMemberDto[]
}
