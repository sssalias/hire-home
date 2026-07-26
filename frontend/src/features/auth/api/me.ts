import { httpClient } from '@/shared/api/http-client.ts'
import type { MeResponseDto } from '@/features/auth/api/dto'

export const me = async () => {
  const { data } = await httpClient.get<MeResponseDto>('/auth/me')
  return data
}
