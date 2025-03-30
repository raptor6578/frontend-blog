import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.png'
import image3 from '../../assets/images/image3.jpg'
import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="article-item">
            <h3>Titre de l'article</h3>
            <img src={image1} alt="Image de l'article" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni unde, alias veniam excepturi
                itaque sequi quibusdam error repudiandae maxime iusto optio </p>
                <br />
            <a href="#">Lire la suite</a>
            </div>
            <div className="article-item">
            <h3>Titre de l'article</h3>
            <img src={image2} alt="Image de l'article" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni unde, alias veniam excepturi
                itaque sequi quibusda quaerat velit dolores dolore! 
                Laudantium a pariatur natus blanditiis.</p>
                <br />
            </div>
            <div className="article-item">
            <h3>Titre de l'article</h3>
            <img src={image3} alt="Image de l'article" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni unde, alias veniam excepturi
                itaque sequi quibusdam error repure! 
                Laudantium a pariatur natus blanditiis.</p>
                <br />
            <a href="#">Lire la suite</a>
            </div>
            <div className="article-item">
            <h3>Titre de l'article</h3>
            <img src={image1} alt="Image de l'article" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni unde, alias veniam excepturi
                itaque sequi quibusdam error repudiandae mat dolores dolore! 
                Laudantium a pariatur natus blanditiis.</p>
                <br />
            <a href="#">Lire la suite</a>
            </div>
            <div className="article-item">
            <h3>Titre de l'article</h3>
            <img src={image2} alt="Image de l'article" />
            <p>Lorem ipsum dolor sit amet coneniam excepturi
                itaque sequi quibusdam error repudiandae maxime iusto optio quaerat velit dolores dolore! 
                Laudantium a pariatur natus blanditiis.</p>
                <br />
            <a href="#">Lire la suite</a>
            </div>
            <div className="article-item">
            <h3>Titre de l'article</h3>
            <img src={image3} alt="Image de l'article" />
            <p>Lorem ipsum dolor sit ame unde, alias veniam excepturi
                itaque sequi quibusdam error repudiandae maxime iusto optio quaerat velit dolores dolore! 
                Laudantium a pariatur natus blanditiis.</p>
                <br />
            <a href="#">Lire la suite</a>
            </div>
        </div>
    )
}

export default Home