import './Article.css'
import { useParams } from 'react-router-dom'
import { articleGet } from '../../services/articleService'
import { useState, useEffect } from 'react'

const Article = () => {

    const [content, setContent] = useState<string>('')
    const { slug } = useParams<{ slug: string }>()

    useEffect(() => {

      const prepareHtml = (html: string) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
      
        doc.querySelectorAll('img[src]').forEach(img => {
          const fileName = img.getAttribute('src')
          if (!fileName) return
          img.setAttribute('src', `http://localhost:8888/images/articles/300/300/${slug}/${fileName}`)
        })
      
        return doc.body.innerHTML
      }

    const articleLoader = async () => {
        try {
            const articleData = await articleGet(slug!)
            setContent(prepareHtml(articleData.content))
        } catch (error) {
            console.error('Error fetching article:', error)
            return null
        }
    }

    articleLoader()

    }, [slug])

    return (
        <div className="article">
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
    )
}

export default Article