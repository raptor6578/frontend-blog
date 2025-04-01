import { Comment } from '../types/Comment'
import { httpJson as http } from './httpService'

const commentPost = async (contentType: string, targetId: string, content: string) => {
  const response = await http.post<Comment>('/comments', {contentType, targetId, content})
  return response.data
}

export { commentPost }