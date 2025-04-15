import axios from 'axios'
import { InternalAxiosRequestConfig } from 'axios'

const create = {
  baseURL: 'http://localhost:8888/api'
}

const createJson = { 
  ...create, headers: {
    'Content-Type': 'application/json'
  } 
}

const interceptors = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

const http = axios.create(create) 
http.interceptors.request.use(interceptors, error => Promise.reject(error))

const httpJson = axios.create(createJson)
httpJson.interceptors.request.use(interceptors, error => Promise.reject(error))

export { http, httpJson }