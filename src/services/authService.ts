import http from './httpService'

export const login = async (email: string, password: string) => {
  const response = await http.post<{ token: string }>('/auth/signin', { email, password })
  const { token } = response.data
  localStorage.setItem('authToken', token)
  return token
}

export const logout = () => {
  localStorage.removeItem('authToken')
}