import { ContentType } from '../enums/ContentType'
import { User } from './User'
import { Article } from './Article'
import { LikeValue } from '../enums/LikeValue'

export interface Like {
  _id: string
  voter: User
  contentType: ContentType
  targetId: Comment | Article
  likedAt: string
  value: LikeValue
}