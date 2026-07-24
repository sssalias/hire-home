import type { AuthResponseDto, LoginDto } from '@/features/auth/api/dto'
import { httpClient } from '@/shared/api/http-client.ts'

export const login = async (dto: LoginDto): Promise<AuthResponseDto> => {
  const { data } = await httpClient.post<AuthResponseDto>('/auth/login', dto)
  return data
}
