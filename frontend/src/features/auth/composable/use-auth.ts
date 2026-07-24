import { login, type LoginDto, register, type RegisterDto } from '@/features/auth/api'
import { tokenService } from '@/shared/utils'

export const useAuth = () => {
  const loginUser = async (dto: LoginDto) => {
    try {
      const { access_token } = await login(dto)
      tokenService.setToken(access_token)
    } catch (error: unknown) {
      throw error
    }
  }
  const registerUser = async (dto: RegisterDto) => {
    try {
      const { access_token } = await register(dto)
      tokenService.setToken(access_token)
    } catch (error: unknown) {
      throw error
    }
  }

  return {
    login: loginUser,
    register: registerUser,
  }
}
