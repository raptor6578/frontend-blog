import { User } from "./User"
import { Comment } from "./Comment"
import { Like } from "./Like"

export interface Article {
  _id: string
  author: User
  title: string
  description: string
  slug: string
  content: string
  imageNames?: string[]
  publishedAt: string
  comments: Comment[]
  likes: Like[]
}