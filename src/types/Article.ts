import { User } from "./User"

export interface Article {
  _id: string
  author: User
  title: string
  slug: string
  content: string
  imagesNames?: string[]
  publishedAt: string
  comments: string[]
  likes: string[]
}