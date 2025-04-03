import { useState } from 'react'
import useSpinner from '../../contexts/Spinner/useSpinner'
import useAuth from '../../contexts/Auth/useAuth'
import useModal from '../../contexts/Modal/useModal'
import useDate from '../../hooks/useDate'
import { commentPost } from '../../services/commentService'
import Likes from '../Likes/Likes'
import type { Comment } from '../../types/Comment'
import './Comments.css'

interface CommentsType {
  comments: Comment[]
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
  const { openSignInModal} = useModal()!
  
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isAuthenticated) {
      openSignInModal()
      return
    }
    if (!comment) return 
    setCommentError('')

    try {
      openSpinner()
      const response = await commentPost(contentType, targetId, comment)
      setLocalComments(prev => [...prev, response])
      closeSpinner()
    } catch (err) {
        if (err instanceof Error) {
          setCommentError(err.message)
          closeSpinner()
        }
    }
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  return (
      <div id="comments" className="comments">
        {localComments.length === 0 ? <h3>Aucun commentaire</h3> : <h3>Commentaires</h3>}
        {localComments!.map((comment) => (
          <div key={comment._id} className="comments-item">
            <div className="comments-header">
              <strong>{comment.author.username}</strong>
              <span> {formatDate(comment.postedAt)}</span>
              <Likes likes={comment.likes} contentType='Comment' targetId={comment._id} />
            </div>
            <p className="comments-content">{comment.content}</p>
          </div>
        ))}
        {commentError && <p className="message error">{commentError}</p>}
        <div className="comments-item"></div>
        <form onSubmit={handleCommentSubmit} className="comments-form">
          <h3>Laissez un commentaire</h3>
          <textarea onChange={handleCommentChange} placeholder="Laissez un commentaire..." />
          <button className="send">Envoyer</button>
        </form>
      </div>
  )
}

export default Comments