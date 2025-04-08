import React from 'react'
import Editor from '../Editor/Editor'
import { postArticle, putArticle } from '../../services/articleService'
import { If, Then, For } from '../ui/directives'
import useModal from '../../contexts/Modal/useModal'
import useRequestMessages from '../../hooks/useRequestMessages'
import type { Article } from '../../types/Article'
import styles from './ArticleEditor.module.css'

const ArticleEditor: React.FC<{ article: Article }> = ({ article }) => {

    const { closeModal } = useModal()
    const messages = useRequestMessages()
    const { errors, success } = messages

    return (
      <React.Fragment>
          <div className={styles.header}>
            <h3>📰 Déposer un article</h3> 
            <button onClick={closeModal}>X</button>
          </div>
          <div className={styles.container}>
            <If condition={success}>
              <Then><div className="message success">✅ {success}</div></Then>
            </If>
            <If condition={errors.length > 0}>
              <Then>
                <For each={errors} render={(error) => (
                  <div className="message error">❌ {error}</div>
                )} />
              </Then>
            </If>
            <Editor 
              postFunction={ postArticle } 
              putFunction={ putArticle }
              messages={messages}
              document={article}
            />
          </div>
      </React.Fragment>
  )

}

export default ArticleEditor