import { Comment } from '../types/Comment'
import { httpJson as http } from './httpService'
import { formatAxiosError } from './utils/formatAxiosError'

const commentPost = async (contentType: string, targetId: string, content: string) => {
  try {
    const response = await http.post<Comment>('/comments', {contentType, targetId, content})
    return response.data
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}

export { commentPost }