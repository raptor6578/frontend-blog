import { User } from "./User"
import { Comment } from "./Comment"
import { Like } from "./Like"

export interface Article {
  _id: string
  author: User
  title: string
  slug: string
  content: string
  imagesNames?: string[]
  publishedAt: string
  comments: Comment[]
  likes: Like[]
}