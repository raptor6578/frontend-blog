import { useState, useEffect } from 'react'
import { getArticle } from '../services/articleService'
import { prepareHtmlBeforeView } from '../services/editorService'
import useDate from '../hooks/useDate'
import type { Article } from '../types/Article'

const useGetArticle = (slug: string | undefined) => {
  const [article, setArticle] = useState<Article | undefined>()
  const [content, setContent] = useState<string>('')
  const { formatDate } = useDate()

  useEffect(() => {
    if (!slug) return

    const fetch = async () => {
      const data = await getArticle(slug)
      data.publishedAt = formatDate(data.publishedAt)
      setArticle(data)
      setContent(prepareHtmlBeforeView(data.content, slug))
    }

    fetch()
  }, [slug, formatDate])

  return { article, content }
}

export default useGetArticle