import './Article.css'
import { useParams } from 'react-router-dom'
import { articleGet } from '../../services/articleService'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSpinner from '../../contexts/Spinner/useSpinner'
import useAuth from '../../contexts/Auth/useAuth'
import { prepareHtmlBeforeView } from '../../services/editorService'
import useModal from '../../contexts/Modal/useModal'
import { Article as ArticleType } from '../../types/Article'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const Article = () => {

    const [content, setContent] = useState<string>('')
    const { slug } = useParams<{ slug: string }>()
    const { openSpinner, closeSpinner } = useSpinner()!
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { openArticlePostModal } = useModal()!
    const navigate = useNavigate()
    const { user } = useAuth()!
    const [ article, setArticle ] = useState<ArticleType | undefined>(undefined)

    useEffect(() => {
      if (!slug) {
        navigate('/')
        return
      }
      const articleLoader = async () => {
        try {
          openSpinner()
          setIsLoading(true)
          const articleData = await articleGet(slug)
          articleData.publishedAt = format(articleData.publishedAt, 'EEEE d MMMM yyyy', { locale: fr })
          setArticle(articleData)
          setContent(prepareHtmlBeforeView(articleData.content, slug))
          closeSpinner()
        } catch (error) {
          navigate('/')
          console.error('Error fetching article:', error)
        } finally {
          closeSpinner()
          setIsLoading(false)
        }
      }
    articleLoader()
        
    }, [slug, openSpinner, closeSpinner, navigate])
    
    const handleEditArticle = () => {
        openArticlePostModal(article)
    }

    if (!slug || isLoading) {
      return (
        <div className="article-view">
          <p>🌀 Chargement de l’article...</p>
        </div>
      )
    }
    

    return (
        <div className="article-view">
            <div className="title">
              <h1>{article?.title}</h1>
              <div className="toolbar">
                <div className="published">
                  <i>
                  Par <strong>{article?.author.username}</strong> le <strong>{article?.publishedAt}</strong>
                </i>
                </div>
                
                <span className="action">
                  <i className="fa fa-brands fa-facebook"></i>
                  <i className="fa fa-brands fa-twitter"></i>
                  <i className="fa fa-solid fa-comment"></i>
                  { user?._id === article?.author._id && <i className="fa fa-solid fa-pen-to-square" onClick={handleEditArticle}></i>}
                </span>
              </div>
            </div>
            <span className="separator"></span>
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
    )
}

export default Article