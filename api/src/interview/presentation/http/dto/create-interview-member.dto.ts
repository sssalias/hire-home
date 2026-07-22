import { IsEnum, IsUUID } from 'class-validator'
import { MemberRole } from '@/interview/domain/interview-member.entity'

export class CreateInterviewMemberDto {
  @IsUUID()
  user_id: string

  @IsEnum(MemberRole)
  role: MemberRole
}
