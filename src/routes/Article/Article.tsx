import React from 'react'
import './Article.css'
import { useParams } from 'react-router-dom';

const Article: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    return (
        <div className="article">
            <h1>Article {slug}</h1>
        </div>
    )
}

export default Article