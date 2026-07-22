import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common'
import { CreateCandidateUseCase } from '@/candidate/application/create-candidate/create-candidate.use-case'
import { CreateCandidateDto } from '@/candidate/presentation/http/dto/create-candidate.dto'
import { CreateCandidateCommand } from '@/candidate/application/create-candidate/create-candidate.command'
import { GetAllCandidatesUseCase } from '@/candidate/application/get-all-candidates/get-all-candidates.use-case'
import { CandidateResponseDto } from '@/candidate/presentation/http/dto/candidate-response-dto'
import { CandidateToResponseDtoMapper } from '@/candidate/presentation/http/mappers/candidate-to-response-dto.mapper'
import { GetOneCandidateUseCase } from '@/candidate/application/get-one-candidate/get-one-candidate.use-case'
import { GetOneCandidateCommand } from '@/candidate/application/get-one-candidate/get-one-candidate.command'
import { DeleteCandidateUseCase } from '@/candidate/application/delete-candidate/delete-candidate.use-case'
import { DeleteCandidateCommand } from '@/candidate/application/delete-candidate/delete-candidate.command'

@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly createCandidateUseCase: CreateCandidateUseCase,
    private readonly getAllCandidatesUseCase: GetAllCandidatesUseCase,
    private readonly getOneCandidateUseCase: GetOneCandidateUseCase,
    private readonly deleteCandidateUseCase: DeleteCandidateUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateCandidateDto) {
    const { full_name, email, resume_link } = dto
    await this.createCandidateUseCase.execute(
      new CreateCandidateCommand(full_name, email, resume_link),
    )
  }

  @Get()
  async getAll(): Promise<CandidateResponseDto[]> {
    const candidates = await this.getAllCandidatesUseCase.execute()
    return CandidateToResponseDtoMapper.toArrayDto(candidates)
  }

  @Get(':candidate_id')
  async getOne(@Param('candidate_id', new ParseUUIDPipe()) candidate_id: string) {
    const candidate = await this.getOneCandidateUseCase.execute(
      new GetOneCandidateCommand(candidate_id),
    )
    if (!candidate) {
      throw new NotFoundException('Кандидат с таким id не найден')
    }

    return CandidateToResponseDtoMapper.toDto(candidate)
  }

  @Delete(':candidate_id')
  async delete(@Param('candidate_id', new ParseUUIDPipe()) candidate_id: string) {
    await this.deleteCandidateUseCase.execute(new DeleteCandidateCommand(candidate_id))
  }
}
