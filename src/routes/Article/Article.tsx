import './Article.css'
import { useParams } from 'react-router-dom'
import { articleGet } from '../../services/articleService'
import { useState, useEffect } from 'react'
import useSpinner from '../../contexts/Spinner/useSpinner'
import { prepareHtmlBeforeView } from '../../services/editorService'
import useModal from '../../contexts/Modal/useModal'
import { Article as ArticleType } from '../../types/Article'

const Article = () => {

    const [content, setContent] = useState<string>('')
    const { slug } = useParams<{ slug: string }>()
    const { openSpinner, closeSpinner } = useSpinner()!
    const { openArticlePostModal } = useModal()!
    const [ articleData, setArticleData ] = useState<ArticleType | undefined>(undefined)
    useEffect(() => {
      const articleLoader = async () => {
        try {
          openSpinner()
          const articleData = await articleGet(slug!)
          setArticleData(articleData)
          setContent(prepareHtmlBeforeView(articleData.content, slug!))
          closeSpinner()
        } catch (error) {
          console.error('Error fetching article:', error)
        }
      }
  
      if (slug) articleLoader()
        
    }, [slug, openSpinner, closeSpinner])
    
    const handleEditArticle = () => {
        openArticlePostModal(articleData!)
    }

    return (
        <div className="article">
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
            <button onClick={handleEditArticle}>test</button>
        </div>
    )
}

export default Article