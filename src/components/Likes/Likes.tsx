import React from 'react'
import axios from 'axios'
import useAuth from '../../contexts/Auth/useAuth'
import { like, unlike } from '../../services/likeService'
import type { Like } from '../../types/Like'

import './Likes.css'

interface LikesTypes {
  likes: Like[]
  contentType: string
  targetId: string
}

const Likes:React.FC<LikesTypes> = ({ likes, contentType, targetId }) => {

  const { user } = useAuth()!
  const [ localLikes, setLocalLikes ] = React.useState<Like[]>(likes)

  const likedIndex = localLikes.findIndex(item => item.voter === user?._id)
  const isLiked = likedIndex !== -1

  const handleLike = async () => {
    try {
      const likeResponse = await like(contentType, targetId)
      setLocalLikes(prev => [...prev, likeResponse])
    } catch (err) {
      const error = axios.isAxiosError(err)
        ? err.response?.data?.message || "Une erreur réseau est survenue."
        : "Une erreur inconnue est survenue."
      console.log(error)
    }
  }

  const handleUnlike = async () => {
    try {
      await unlike(localLikes[likedIndex]._id)
      setLocalLikes(prev => prev.filter((_, i) => i !== likedIndex))
    } catch (err) {
      const error = axios.isAxiosError(err)
        ? err.response?.data?.message || "Une erreur réseau est survenue."
        : "Une erreur inconnue est survenue."
      console.log(error)
    }
  }

  return (
    <span className="like">
    { isLiked 
      ? <i onClick={() => handleUnlike()} className="fa fa-solid fa-thumbs-up"></i>
      : <i onClick={() => handleLike()} className="fa fa-regular fa-thumbs-up"></i>
    }
    </span>
  )

}

export default Likes