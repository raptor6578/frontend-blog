import React from "react"
import "./Nav.css"
import useAuth from '../../../contexts/Auth/useAuth'
import { Link } from "react-router-dom"
import { If, Then, Else } from "../../ui/directives"
import useModal from "../../../contexts/Modal/useModal"

const Nav: React.FC = () => {

  const { isAuthenticated, signOut } = useAuth()!
  const { openModal } = useModal()

  return (
    <div className="nav">
      <nav>
        <ul>
          <li><Link className="nav-links" to="/">Accueil</Link></li>
          <If condition={isAuthenticated}>
            <Then>
              <li><a className="nav-links" onClick={signOut}>Déconnexion</a></li>
              <li><a className="nav-links" onClick={() => openModal('articleEditor')}>Déposer un article</a></li>
            </Then>
            <Else>
              <li><a className="nav-links" onClick={() => openModal('signIn')}>Connexion</a></li>
              <li><a className="nav-links"onClick={() => openModal('signUp')}>Inscription</a></li>
            </Else>
          </If>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
