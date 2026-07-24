import axios, { type AxiosError } from 'axios'
import { ApiError, type ApiErrorResponse } from '@/shared/api/errors'
import TokenService from '@/shared/utils/token-service.ts'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const code = error.response?.data.code
    const message = error.response?.data.message

    console.log(error, code, message)

    if (!code || !message) {
      return Promise.reject(error)
    }

    return Promise.reject(new ApiError(message, code))
  },
)

httpClient.interceptors.request.use((config) => {
  const token = TokenService.getToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
})
