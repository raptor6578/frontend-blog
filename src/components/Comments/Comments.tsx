import { useState } from 'react'
import axios from 'axios'
import useSpinner from '../../contexts/Spinner/useSpinner'
import useAuth from '../../contexts/Auth/useAuth'
import useDate from '../../hooks/useDate'
import { commentPost } from '../../services/commentService'
import Likes from '../Likes/Likes'
import type { Comment } from '../../types/Comment'
import './Comments.css'

interface CommentsType {
  comments: Comment[] | undefined
  targetId: string
  contentType: string
}

const Comments:React.FC<CommentsType> = ({ comments, contentType, targetId }) => {

  const { openSpinner, closeSpinner } = useSpinner()!
  const { isAuthenticated } = useAuth()!
  const { formatDate } = useDate()
  const  [comment, setComment ] = useState<string>('')
  const [ commentError, setCommentError ] = useState<string>('')
  const [ localComments, setLocalComments ] = useState<Comment[]>(comments || [])
  
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!comment) return 
    setCommentError('')

    try {
      openSpinner()
      const response = await commentPost(contentType, targetId, comment)
      setLocalComments(prev => [...prev, response])
      closeSpinner()
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Une erreur réseau est survenue."
        : "Une erreur inconnue est survenue."

      setCommentError(message)
      closeSpinner()
    }
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  return (
      <div className="comment">
        {localComments.length === 0 ? <h3>Aucun commentaire</h3> : <h3>Commentaires</h3>}
        {localComments!.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-header">
              <strong>{comment.author.username}</strong>
              <span> {formatDate(comment.postedAt)} </span>
              <Likes likes={comment.likes} contentType='Comment' targetId={comment._id} />
            </div>
            <p className="comment-content">{comment.content}</p>
          </div>
        ))}
        {commentError && <p className="message error">{commentError}</p>}
        <div className="comment-item"></div>
        {isAuthenticated &&
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <h3>Laissez un commentaire</h3>
          <textarea onChange={handleCommentChange} placeholder="Laissez un commentaire..." />
          <button className="send">Envoyer</button>
        </form>
        }
      </div>
  )
}

export default Comments