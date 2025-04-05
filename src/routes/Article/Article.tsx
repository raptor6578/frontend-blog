import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useDate from '../../hooks/useDate'
import useAuth from '../../contexts/Auth/useAuth'
import useModal from '../../contexts/Modal/useModal'
import setSeo from '../../services/utils/setSeo'
import Likes from '../../components/Likes/Likes'
import Comments from '../../components/Comments/Comments'
import SkeletonLoading from '../../components/SkeletonLoading/SkeletonLoading'
import ActionButton from '../../components/ui/ActionButton/ActionButton'
import { If, Then } from '../../components/ui/directives'
import { prepareHtmlBeforeView } from '../../services/editorService'
import { articleGet } from '../../services/articleService'
import type { Article as ArticleType } from '../../types/Article'
import './Article.css'

const Article = () => {
  
    const { slug } = useParams<{ slug: string }>()
    const { openArticlePostModal } = useModal()!
    const { user, isAuthenticated } = useAuth()!
    const navigate = useNavigate()
    const { formatDate } = useDate()
    const [ article, setArticle ] = useState<ArticleType | undefined>(undefined)
    const [content, setContent] = useState<string>('')

    useEffect(() => {
      if (!slug) {
        navigate('/')
        return
      }
      const articleLoader = async () => {
        const articleData = await articleGet(slug)
        setSeo({
          title: articleData.title,
          description: articleData.description,
        })
        articleData.publishedAt = formatDate(articleData.publishedAt)
        setArticle(articleData)
        setContent(prepareHtmlBeforeView(articleData.content, slug))
      }
      articleLoader()
    }, [slug, navigate, formatDate])
    
    if (!article) {
      return <SkeletonLoading />
    }
    
    return (
      <div className="article">
        <div className="article-header">
          <div className="published">
          Par <strong>{article.author.username}</strong> le <strong>{article.publishedAt}</strong>
          </div>
          <h1>{article.title}</h1>
          <span className="action">
            <ActionButton icon="fa-solid fa-comment" text={article.comments.length} />
            <If condition={isAuthenticated && user!._id === article.author._id}>
              <Then><ActionButton icon="fa-solid fa-pen-to-square" onClick={() => openArticlePostModal(article)} /></Then>
            </If>
            <Likes likes={article.likes} contentType='Article' targetId={article._id} />
          </span>
        </div>
        <span className="separator first-separator" />
        <If condition={content}> 
          <Then><div dangerouslySetInnerHTML={{ __html: content }} /></Then>
        </If>
        <span className="separator last-separator" />
        <Comments comments={article.comments} contentType='Article' targetId={article._id} />
      </div> 
    ) 

}

export default Article