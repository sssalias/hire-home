import type { AuthResponseDto, RegisterDto } from '@/features/auth/api/dto'
import { httpClient } from '@/shared/api/http-client.ts'

export const register = async (dto: RegisterDto): Promise<AuthResponseDto> => {
  const { data } = await httpClient.post<AuthResponseDto>('/auth/register', dto)
  return data
}
