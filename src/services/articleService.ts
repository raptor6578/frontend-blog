import { Article } from '../types/Article'
import { http, httpJson } from './httpService'

const articlePost = async (formData: FormData) => {
  const response = await http.post<{ message: string }>('/articles', formData)
  const { message } = response.data
  return message
}

const articlePut = async (slug: string, formData: FormData) => {
  const response = await http.put<{ message: string }>('/articles/' + slug, formData)
  const { message } = response.data
  return message
}

const articleGet = async (slug: string) => {
  const response = await httpJson.get<Article>('/articles/' + slug)
  return response.data
}

export { articlePost, articlePut, articleGet}