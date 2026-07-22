import { Body, Controller, Post } from '@nestjs/common'
import { CreateInterviewUseCase } from '@/interview/application/create-interview/create-interview.use-case'
import { CreateInterviewDto } from '@/interview/presentation/http/dto/create-interview.dto'
import { CreateInterviewCommandMapper } from '@/interview/presentation/http/mapper/create-interview-command.mapper'

@Controller('interview')
export class InterviewController {
  constructor(private readonly createInterviewUseCase: CreateInterviewUseCase) {}

  @Post()
  async create(@Body() dto: CreateInterviewDto) {
    await this.createInterviewUseCase.execute(CreateInterviewCommandMapper.toCommand(dto))
  }
}
