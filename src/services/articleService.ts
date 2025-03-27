import { http, httpJson } from './httpService'

const articlePost = async (formData: FormData) => {
  const response = await http.post<{ message: string }>('/articles', formData)
  const { message } = response.data
  return message
}

const articleGet = async (slug: string) => {
  const response = await httpJson.get<{ title: string, content: string, images?: File[] }>('/articles/' + slug)
  return response.data
}

export { articlePost, articleGet}