import { useParams } from 'react-router-dom'
import useAuth from '../../contexts/Auth/useAuth'
import useGetArticle from '../../hooks/useGetArticle'
import setSeo from '../../services/utils/setSeo'
import useModal from '../../contexts/Modal/useModal'
import Like from '../../components/Like/Like'
import Comments from '../../components/Comments/Comments'
import SkeletonLoading from '../../components/SkeletonLoading/SkeletonLoading'
import ActionButton from '../../components/ui/ActionButton/ActionButton'
import { If, Then } from '../../components/ui/directives'

import styles from './Article.module.css'

const Article = () => {
  
  const { slug } = useParams<{ slug: string }>()
  const { user, isAuthenticated } = useAuth()
  const { article, content } = useGetArticle(slug)
  const { openModal } = useModal()

  if (!article) {
    return <SkeletonLoading />
  }

  setSeo({
    title: article.title,
    description: article.description,
  })

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <div>
        Par <strong>{article.author.username}</strong> le <strong>{article.publishedAt}</strong>
        </div>
        <h1>{article.title}</h1>
        <span>
          <ActionButton icon="fa-solid fa-comment" text={article.comments.length} />
          <If condition={isAuthenticated && user!._id === article.author._id}>
            <Then><ActionButton onClick={() => openModal('articleEditor', article)} icon="fa-solid fa-pen-to-square" /></Then>
          </If>
          <Like likes={article.likes} contentType='Article' targetId={article._id} />
        </span>
      </div>
      <span className={`${styles.separator} ${styles.firstSeparator}`} />
      <If condition={content}> 
        <Then><div dangerouslySetInnerHTML={{ __html: content }} /></Then>
      </If>
      <span className={`${styles.separator} ${styles.lastSeparator}`} />
      <Comments comments={article.comments} contentType='Article' targetId={article._id} />
    </div> 
  ) 

}

export default Article