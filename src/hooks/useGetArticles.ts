import { useEffect, useState } from 'react'
import { getArticles } from '../services/articleService'
import type { Article } from '../types/Article'

const useGetArticles = () => {

  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetch = async () => {
      const data = await getArticles()
      setArticles(data)
    }
    fetch()
  }, [])

  return { articles }
}

export default useGetArticles