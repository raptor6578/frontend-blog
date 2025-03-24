import http from './httpService'

export const login = async (email: string, password: string) => {
  const response = await http.post<{ token: string }>('/auth/signin', { email, password })
  const { token } = response.data
  localStorage.setItem('authToken', token)
  return token
}

export const register = async (email: string, password: string) => {
  const response = await http.post<{ message: string }>('/auth/signup', { email, password })
  const { message } = response.data
  return message
}

export const logout = () => {
  localStorage.removeItem('authToken')
}