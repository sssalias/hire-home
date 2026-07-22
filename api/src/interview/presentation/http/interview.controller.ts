import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateInterviewUseCase } from '@/interview/application/create-interview/create-interview.use-case'
import { CreateInterviewDto } from '@/interview/presentation/http/dto/create-interview.dto'
import { CreateInterviewCommandMapper } from '@/interview/presentation/http/mapper/create-interview-command.mapper'
import { Jwt } from '@/auth/presentation/http/guards/jwt-payload.decorator'
import type { JwtPayload } from '@/auth/infrastructure/jwt/types/jwt-payload'
import { GetUserInterviewsUseCase } from '@/interview/application/get-user-interviews/get-user-interviews.use-case'
import { GetUserInterviewsCommand } from '@/interview/application/get-user-interviews/get-user-interviews.command'
import { InterviewResponseDto } from '@/interview/presentation/http/dto/interview-response.dto'

@Controller('interview')
export class InterviewController {
  constructor(
    private readonly createInterviewUseCase: CreateInterviewUseCase,
    private readonly getUserInterviewsUseCase: GetUserInterviewsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateInterviewDto) {
    await this.createInterviewUseCase.execute(CreateInterviewCommandMapper.toCommand(dto))
  }

  @Get('my')
  async getMyByUserId(@Jwt() payload: JwtPayload): Promise<InterviewResponseDto[]> {
    const { sub } = payload
    const userInterviews = await this.getUserInterviewsUseCase.execute(
      new GetUserInterviewsCommand(sub),
    )
    return userInterviews.map(
      ({ id, topic, status, createdAt, scheduleAt, startedAt, completedAt }) =>
        new InterviewResponseDto(id, topic, status, createdAt, scheduleAt, startedAt, completedAt),
    )
  }
}
