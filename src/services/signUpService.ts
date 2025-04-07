import { http } from './httpService'
import { formatAxiosError } from './utils/formatAxiosError'

export const postSignUp = async (email: string, username: string, password: string) => {
  try {
    const response = await http.post<{ message: string }>('/auth/signup', { email, username, password })
    const { message } = response.data
    return message
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}