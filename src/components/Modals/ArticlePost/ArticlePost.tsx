import React from 'react'
import './ArticlePost.css'
import Modal from 'react-modal'
import useModal from '../../../contexts/Modal/useModal'
import Editor from '../../Editor/Editor'

const ArticlePost = () => {

    const { modalArticlePostIsOpen, closeArticlePostModal } = useModal()!

    const afterOpenModal = () => {
      console.log('afterOpenModal')
    }

    return (
      <React.Fragment>
        <Modal
          contentLabel="Déposer un article"
          isOpen={modalArticlePostIsOpen}
          onRequestClose={closeArticlePostModal}
          onAfterOpen={afterOpenModal}
          className="article-post"
          overlayClassName="overlay"
        >
          <div className="modal-header">
            <h3>📰 Déposer un article</h3> 
            <button onClick={closeArticlePostModal}>X</button>
          </div>
          <div className="container-article-post">
            <div className="success">✅ Votre article a bien été envoyé, il est actuellement en attente de modération.</div>
            <Editor />
          </div>
        </Modal>
      </React.Fragment>
  )

}

export default ArticlePost