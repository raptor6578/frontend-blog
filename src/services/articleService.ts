import { Article } from '../types/Article'
import { http, httpJson } from './httpService'
import { formatAxiosError } from './utils/formatAxiosError'

const postArticle = async (formData: FormData) => {
  try {
    const response = await http.post<{ message: string }>('/articles', formData)
    const { message } = response.data
    return message
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}

const putArticle = async (slug: string, formData: FormData) => {
  try {
    const response = await http.put<{ message: string }>('/articles/' + slug, formData)
    const { message } = response.data
    return message
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}

const getArticle = async (slug?: string) => {
  try {
    const response =  await httpJson.get<Article>('/articles/' + slug)
    return response.data
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}

const getArticles = async () => {
  try {
    const response = await httpJson.get<Article[]>('/articles')
    return response.data
  } catch (error) {
    throw new Error(formatAxiosError(error))
  }
}



export {  postArticle, putArticle, getArticle, getArticles }