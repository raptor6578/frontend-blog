import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useDate from '../../hooks/useDate'
import useAuth from '../../contexts/Auth/useAuth'
import useModal from '../../contexts/Modal/useModal'
import Likes from '../../components/Likes/Likes'
import Comments from '../../components/Comments/Comments'
import SkeletonLoading from '../../components/SkeletonLoading/SkeletonLoading'
import ActionButton from '../../components/ui/ActionButton/ActionButton'
import { prepareHtmlBeforeView } from '../../services/editorService'
import { articleGet } from '../../services/articleService'
import type { Article as ArticleType } from '../../types/Article'
import './Article.css'

const Article = () => {

    const [content, setContent] = useState<string>('')
    const { slug } = useParams<{ slug: string }>()
    const { openArticlePostModal } = useModal()!
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()!
    const { formatDate } = useDate()
    const [ article, setArticle ] = useState<ArticleType | undefined>(undefined)

    useEffect(() => {
      if (!slug) {
        navigate('/')
        return
      }
      const articleLoader = async () => {
        const articleData = await articleGet(slug)
        articleData.publishedAt = formatDate(articleData.publishedAt)
        setArticle(articleData)
        setContent(prepareHtmlBeforeView(articleData.content, slug))
      }
    articleLoader()
        
    }, [slug, navigate, formatDate])
    
    const handleEditArticle = () => {
        openArticlePostModal(article)
    }

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
                { (isAuthenticated && user!._id === article.author._id) && <ActionButton icon="fa-solid fa-pen-to-square" onClick={handleEditArticle} /> }
                <Likes likes={article.likes} contentType='Article' targetId={article._id} />
              </span>
            </div>
            <span className="separator first-separator" />
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
            <span className="separator last-separator" />
            <Comments comments={article.comments} contentType='Article' targetId={article._id} />
        </div> 
    ) 
}

export default Article