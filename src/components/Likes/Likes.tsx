import React, { useState } from 'react'
import useAuth from '../../contexts/Auth/useAuth'
import useModal from '../../contexts/Modal/useModal'
import { like, unlike } from '../../services/likeService'
import ActionButton from '../ui/ActionButton/ActionButton'
import type { Like } from '../../types/Like'

import './Likes.css'

interface LikesTypes {
  likes: Like[]
  contentType: string
  targetId: string
}

const Likes:React.FC<LikesTypes> = ({ likes, contentType, targetId }) => {

  const { user, isAuthenticated } = useAuth()!
  const { openSignInModal } = useModal()!
  const [ localLikes, setLocalLikes ] = useState<Like[]>(likes)
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const likedIndex = localLikes.findIndex(item => item.voter === user?._id)
  const isLiked = likedIndex !== -1
  const totalLikes = localLikes.length

  const addLike = async (contentType: string, targetId: string) => {
    const likeResponse = await like(contentType, targetId)
    setLocalLikes(prev => [...prev, likeResponse])
  }

  const deleteLike = async (likeId: string) => {
    await unlike(likeId)
    setLocalLikes(prev => prev.filter((_, i) => i !== likedIndex))
  }

  const handleLike = async () => {
    if (!isAuthenticated) {
      openSignInModal()
      return
    }  
    setIsLoading(true)
    try {
      await (isLiked
        ? deleteLike(localLikes[likedIndex]._id)
        : addLike(contentType, targetId))
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <span className="like">
      <ActionButton 
      icon={ isLiked && isAuthenticated ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up'} 
      text={totalLikes} 
      onClick={handleLike} 
      disabled={isLoading} 
    />
    </span>
  )

}

export default Likes