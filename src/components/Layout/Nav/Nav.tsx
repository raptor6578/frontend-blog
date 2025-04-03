import React from "react"
import "./Nav.css"
import useModal from '../../../contexts/Modal/useModal'
import useAuth from '../../../contexts/Auth/useAuth'
import { Link } from "react-router-dom"

const Nav: React.FC = () => {

  const { openSignInModal, openSignUpModal, openArticlePostModal } = useModal()!
  const { isAuthenticated, logout } = useAuth()!

  return (
    <div className="nav">
      <nav>
        <ul>
          <li><Link className="nav-links" to="/">Accueil</Link></li>
            {isAuthenticated ? 
            <>
             <li><a className="nav-links" onClick={logout}>Déconnexion</a></li>
             <li><a className="nav-links" onClick={() => openArticlePostModal()}>Déposer un article</a></li>
            </>
            : 
            <>
              <li><a className="nav-links" onClick={openSignInModal}>Connexion</a></li>
              <li><a className="nav-links" onClick={openSignUpModal}>Inscription</a></li>
            </>
            }
        </ul>
      </nav>
    </div>
  )
}

export default Nav
