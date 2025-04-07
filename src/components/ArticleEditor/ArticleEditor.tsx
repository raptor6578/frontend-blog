import React from 'react'
import Editor from '../Editor/Editor'
import { postArticle, putArticle } from '../../services/articleService'
import { If, Then } from '../ui/directives'
import useModal from '../../contexts/Modal/useModal'
import type { Article } from '../../types/Article'
import './ArticleEditor.css'

const ArticleEditor: React.FC<{ article: Article }> = ({ article }) => {

    const [message, setMessage] = React.useState<string>('')
    const [error, setError] = React.useState<string>('')
    const { closeModal } = useModal()

  /*  const afterOpenModal = () => {
      setError('')
      setMessage('')
    }*/

    return (
      <React.Fragment>
          <div className="modal-header">
            <h3>📰 Déposer un article</h3> 
            <button onClick={closeModal}>X</button>
          </div>
          <div className="container-article-modal">
            <If condition={message}>
              <Then><div className="message success">✅ {message}</div></Then>
            </If>
            <If condition={error}>
              <Then><div className="message error">❌ {error}</div></Then>
            </If>
            <Editor 
              postFunction={ postArticle } 
              putFunction={ putArticle }
              document={article} 
              setMessage={setMessage} 
              setError={setError} 
            />
          </div>
      </React.Fragment>
  )

}

export default ArticleEditor