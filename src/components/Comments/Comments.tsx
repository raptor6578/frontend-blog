import { useState } from 'react'
import useAuth from '../../contexts/Auth/useAuth'
import useModal from '../../contexts/Modal/useModal'
import useDate from '../../hooks/useDate'
import usePostComment from '../../hooks/usePostComment'
import Like from '../Like/Like'
import type { Comment } from '../../types/Comment'
import './Comments.css'
import { For, If, Then, Else } from '../ui/directives'

interface CommentsType {
  comments: Comment[]
  targetId: string
  contentType: string
}

const Comments:React.FC<CommentsType> = ({ comments, contentType, targetId }) => {

  const { isAuthenticated } = useAuth()!
  const { formatDate } = useDate()
  const { post, error } = usePostComment()
  const [ localComments, setLocalComments ] = useState<Comment[]>(comments || [])
  const { openSignInModal} = useModal()!
  
  const handleNewComment = async (formData: FormData) => {
    if (!isAuthenticated) {
      openSignInModal()
      return
    }
    const newComment = formData.get('comment')
    if (typeof newComment !== 'string' || !newComment.trim()) return
    const response = await post(contentType, targetId, newComment)
    if (!response) return
    setLocalComments(prev => [...prev, response])
  }

  return (
      <div id="comments" className="comments">
        <If condition={localComments.length > 0}>
          <Then>
            <h3>Commentaires</h3>
          </Then>
          <Else>
            <h3>Aucun commentaire</h3>
          </Else>
        </If>
        <For each={localComments} render={(comment) => (
          <div key={comment._id} className="comments-item">
            <div className="comments-header">
              <strong>{comment.author.username}</strong>
              <span> {formatDate(comment.postedAt)}</span>
              <Like likes={comment.likes} contentType='Comment' targetId={comment._id} />
            </div>
            <p className="comments-content">{comment.content}</p>
          </div>
        )} /> 
        <If condition={error}>
          <Then>
            <p className="message error">{error}</p>
          </Then>
        </If>
        <div className="comments-item"></div>
        <form action={handleNewComment} className="comments-form">
          <h3>Laissez un commentaire</h3>
          <textarea name="comment" placeholder="Laissez un commentaire..." />
          <button className="send">Envoyer</button>
        </form>
      </div>
  )
}

export default Comments