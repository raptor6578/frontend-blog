import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useDate from '../../hooks/useDate'
import useSpinner from '../../contexts/Spinner/useSpinner'
import useAuth from '../../contexts/Auth/useAuth'
import useModal from '../../contexts/Modal/useModal'
import Likes from '../../components/Likes/Likes'
import Comments from '../../components/Comments/Comments'
import { prepareHtmlBeforeView } from '../../services/editorService'
import { articleGet } from '../../services/articleService'
import type { Article as ArticleType } from '../../types/Article'
import './Article.css'

const Article = () => {

    const [content, setContent] = useState<string>('')
    const { slug } = useParams<{ slug: string }>()
    const { openSpinner, closeSpinner } = useSpinner()!
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
        try {
          openSpinner()
          const articleData = await articleGet(slug)
          articleData.publishedAt = formatDate(articleData.publishedAt)
          setArticle(articleData)
          setContent(prepareHtmlBeforeView(articleData.content, slug))
          closeSpinner()
        } catch (error) {
          navigate('/')
          console.error('Error fetching article:', error)
        } finally {
          closeSpinner()
        }
      }
    articleLoader()
        
    }, [slug, openSpinner, closeSpinner, navigate, formatDate])
    
    const handleEditArticle = () => {
        openArticlePostModal(article)
    }

    if (!article) {
      return (
        <div className="article-view">
          <p>🌀 Chargement de l’article...</p>
        </div>
      )
    }
    
    return (
        <div className="article-view">
          <div className="title">
            <h1>{article.title}</h1>
            <div className="toolbar">
              <div className="published">
                <i>
                Par <strong>{article.author.username}</strong> le <strong>{article.publishedAt}</strong>
              </i>
              </div>
              <span className="action">
                <i className="fa fa-solid fa-comment"></i>
                <Likes likes={article.likes} contentType='Article' targetId={article._id} />
                { (isAuthenticated && user!._id === article.author._id) && <i className="fa fa-solid fa-pen-to-square" onClick={handleEditArticle}></i>}
              </span>
            </div>
          </div>
          <span className="separator first-separator" />
          {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
          <span className="separator last-separator" />
          <Comments comments={article.comments} contentType='Article' targetId={article._id} />
        </div> 
    )
}

export default Article