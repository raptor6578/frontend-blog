import React from "react"
import "./Nav.css"
import useModal from '../../../contexts/Modal/useModal'
import useAuth from '../../../contexts/Auth/useAuth'
import { Link } from "react-router-dom"
import { If, Then, Else } from "../../ui/directives"

const Nav: React.FC = () => {

  const { openSignInModal, openSignUpModal, openArticlePostModal } = useModal()!
  const { isAuthenticated, signOut } = useAuth()!

  return (
    <div className="nav">
      <nav>
        <ul>
          <li><Link className="nav-links" to="/">Accueil</Link></li>
          <If condition={isAuthenticated}>
            <Then>
              <li><a className="nav-links" onClick={signOut}>Déconnexion</a></li>
              <li><a className="nav-links" onClick={() => openArticlePostModal()}>Déposer un article</a></li>
            </Then>
            <Else>
              <li><a className="nav-links" onClick={openSignInModal}>Connexion</a></li>
              <li><a className="nav-links" onClick={openSignUpModal}>Inscription</a></li>
            </Else>
          </If>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
