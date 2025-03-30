import { User } from '../types/User'
import { http } from './httpService'

export const login = async (email: string, password: string) => {
  const response = await http.post<{ token: string, user: User }>('/auth/signin', { email, password })
  const { token, user } = response.data
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  return response.data
}

export const register = async (email: string, password: string) => {
  const response = await http.post<{ message: string }>('/auth/signup', { email, password })
  const { message } = response.data
  return message
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}