import { Article } from '../types/Article'
import { http, httpJson } from './httpService'
import { formatAxiosError } from './utils/formatAxiosError'

const articlePost = async (formData: FormData) => {
  try {
    const response = await http.post<{ message: string }>('/articles', formData)
    const { message } = response.data
    return message
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}

const articlePut = async (slug: string, formData: FormData) => {
  try {
    const response = await http.put<{ message: string }>('/articles/' + slug, formData)
    const { message } = response.data
    return message
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}

const articleGet = async (slug?: string) => {
  try {
    const response =  await httpJson.get<Article>('/articles/' + slug)
    return response.data
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}

const articlesGet = async () => {
  try {
    const response = await httpJson.get<Article[]>('/articles')
    return response.data
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}



export { articlePost, articlePut, articleGet, articlesGet}