import { Like } from '../types/Like'
import { httpJson as http } from './httpService'

const like = async (contentType: string, targetId: string) => {
  const response = await http.post<Like>('/likes', { contentType, targetId, value: 1 })
  return response.data
}

const unlike = async (targetId: string) => {
  const response = await http.delete<{message: string}>('/likes', { data: { targetId }})
  return response.data
}

export { like, unlike }