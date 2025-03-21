import React from "react"
import "./Nav.css"
import useModal from '../../../contexts/Modal/useModal'
import useAuth from '../../../contexts/Auth/useAuth'

const Nav: React.FC = () => {

  const { openModal } = useModal()!
  const { isAuthenticated, logout } = useAuth()!

  return (
    <div className="nav">
      <nav>
        <ul>
          <li><a>Articles</a></li>
          <li>
            {isAuthenticated ? <a onClick={logout}>Déconnexion</a> : <a onClick={openModal}>Connexion</a>}
          </li>
          {!isAuthenticated && <li><a>Inscription</a></li>}
        </ul>
      </nav>
    </div>
  )
}

export default Nav
