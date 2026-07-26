import {
  login,
  type LoginDto,
  me,
  type MeResponseDto,
  register,
  type RegisterDto,
} from '@/features/auth/api'
import { tokenService } from '@/shared/utils'
import { useQuery } from '@/shared/composable'

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

  const getMeUser = () =>
    useQuery<MeResponseDto>({
      queryFunc: me,
    })

  const logoutUser = () => {
    tokenService.removeToken()
  }

  return {
    login: loginUser,
    register: registerUser,
    getUser: getMeUser,
    logout: logoutUser,
  }
}
