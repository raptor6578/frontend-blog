import React from 'react'
import './Article.css'
import Modal from 'react-modal'
import useModal from '../../../contexts/Modal/useModal'
import Editor from '../../Editor/Editor'
import { articlePost, articlePut } from '../../../services/articleService'
import { If, Then } from '../../ui/directives'

const Article = () => {

    const { modalArticlePostIsOpen, modalArticleObject, closeArticlePostModal } = useModal()!
    const [message, setMessage] = React.useState<string>('')
    const [error, setError] = React.useState<string>('')

    const afterOpenModal = () => {
      setError('')
      setMessage('')
    }

    return (
      <React.Fragment>
        <Modal
          contentLabel="Déposer un article"
          isOpen={modalArticlePostIsOpen}
          onRequestClose={closeArticlePostModal}
          onAfterOpen={afterOpenModal}
          className="article-modal"
          overlayClassName="overlay"
        >
          <div className="modal-header">
            <h3>📰 Déposer un article</h3> 
            <button onClick={closeArticlePostModal}>X</button>
          </div>
          <div className="container-article-modal">
            <If condition={message}>
              <Then><div className="message success">✅ {message}</div></Then>
            </If>
            <If condition={error}>
              <Then><div className="message error">❌ {error}</div></Then>
            </If>
            <Editor 
              postFunction={ articlePost } 
              putFunction={ articlePut }
              document={modalArticleObject} 
              setMessage={setMessage} 
              setError={setError} 
            />
          </div>
        </Modal>
      </React.Fragment>
  )

}

export default Article