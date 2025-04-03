import { Like } from '../types/Like'
import { httpJson as http } from './httpService'
import { formatAxiosError } from './utils/formatAxiosError'

const like = async (contentType: string, targetId: string) => {
  try {
    const response = await http.post<Like>('/likes', { contentType, targetId, value: 1 })
    return response.data
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}

const unlike = async (targetId: string) => {
  try {
    const response = await http.delete<{message: string}>('/likes', { data: { targetId }})
    return response.data
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}

export { like, unlike }