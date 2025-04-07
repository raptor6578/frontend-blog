import { User } from '../types/User'
import { http } from './httpService'
import { formatAxiosError } from './utils/formatAxiosError'

export const postSignIn = async (email: string, password: string) => {
  try {
    const response = await http.post<{ token: string, user: User }>('/auth/signin', { email, password })
    return response.data
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}
