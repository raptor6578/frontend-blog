import { Link } from "react-router-dom"
import { extractTextFromHTML } from '../../services/editorService'
import { For } from '../../components/ui/directives'
import SkeletonLoading from '../../components/SkeletonLoading/SkeletonLoading'
import useGetArticles from '../../hooks/useGetArticles'

import styles from './Home.module.css'

const Home = () => {

  const { articles } = useGetArticles()

  if (articles.length === 0) {
    return <SkeletonLoading />
  }

  return (
    <div className={styles.home}>
      <For each={articles} render={(article) => (
        <div className={styles.item} key={article._id}>
          <h3>{article.title}</h3>
          <img src={"http://localhost:8888/api/images/articles/" + "/" + article.slug + "/" + article.imageNames![0]}
            alt="Image de l'article"
            loading="lazy"
          />
          <p>{extractTextFromHTML(article.content, 250)}</p>
          <Link to={'/article/' + article.slug}>Lire la suite.</Link>
        </div>
      )} />
    </div>
  )
}

export default Home