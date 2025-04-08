import React from "react"
import useAuth from '../../../contexts/Auth/useAuth'
import { Link } from "react-router-dom"
import { If, Then, Else } from "../../ui/directives"
import useModal from "../../../contexts/Modal/useModal"
import styles from './Nav.module.css'

const Nav: React.FC = () => {

  const { isAuthenticated, signOut } = useAuth()
  const { openModal } = useModal()

  return (
    <div className={styles.nav}>
      <nav>
        <ul>
          <li><Link className={styles.navLink} to="/">Accueil</Link></li>
          <If condition={isAuthenticated}>
            <Then>
              <li><a className={styles.navLink} onClick={signOut}>Déconnexion</a></li>
              <li><a className={styles.navLink} onClick={() => openModal('articleEditor')}>Déposer un article</a></li>
            </Then>
            <Else>
              <li><a className={styles.navLink} onClick={() => openModal('signIn')}>Connexion</a></li>
              <li><a className={styles.navLink} onClick={() => openModal('signUp')}>Inscription</a></li>
            </Else>
          </If>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
