import { User } from './User'
import { ContentType } from '../enums/ContentType'
import { Like } from './Like'

export interface Comment {
  _id: string
  author: User[]
  contentType: ContentType
  targetId: string
  content: string
  postedAt: string
  likes: Like[]
  parentComment: Comment[]
}