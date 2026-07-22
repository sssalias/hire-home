import { InterviewReadModel } from '@/interview/application/get-user-interviews/models/interview.read-model'
import { InterviewResponseDto } from '@/interview/presentation/http/dto/interview-response.dto'

export class GetUserInterviewToResponseDtoMapper {
  static toResponseUserInterviewsDto(
    interviewsReadModel: InterviewReadModel[],
  ): InterviewResponseDto[] {
    return interviewsReadModel.map(
      ({ id, candidateId, topic, status, createdAt, scheduleAt, startedAt, completedAt }) =>
        new InterviewResponseDto(
          id,
          candidateId,
          topic,
          status,
          createdAt,
          scheduleAt,
          startedAt,
          completedAt,
        ),
    )
  }
}
