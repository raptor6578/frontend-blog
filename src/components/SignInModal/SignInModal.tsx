import React, { useState } from 'react'
import './SignInModal.css'
import Modal from 'react-modal'
import useAuth from '../../contexts/Auth/useAuth'
import useModal from '../../contexts/Modal/useModal'
import useSpinner from '../../contexts/Spinner/useSpinner'
import { signInValidator } from '../../validators/authValidator'
import axios from 'axios'

const SignInModal: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])
    
    const { login } = useAuth()!
    const { modalIsOpen, closeModal } = useModal()!
    const { openSpinner, closeSpinner } = useSpinner()!

    const handleSetErrors = (message: string) => {
      setErrors(errors => [...errors, message])
    }

    const afterOpenModal = () => {
      setErrors([])
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setErrors([])
      const errorsValidator = signInValidator(email, password)
      errorsValidator.forEach(error => handleSetErrors(error.message))
      if (errorsValidator.length > 0) return
      try {
        openSpinner()
        await login(email, password)
        closeSpinner()
        closeModal()
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          closeSpinner()
          handleSetErrors(error.response.data.message)
        }
      }
    }

    return (
      <React.Fragment>
        <Modal
          contentLabel="Connexion"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onAfterOpen={afterOpenModal}
          className="signin"
          overlayClassName="overlay"
        >
          <div className="close-modal">
            <button onClick={closeModal}>X</button>
          </div>
          <div className="container-signin">
            <h2>Connexion</h2>

            {(errors.length > 0) && 
            <div className='error'> 
            
            { errors.map((error, index) => ( 
              <p key={index}><span role="img" aria-label="Erreur">❌</span> {error}</p>
            ))}
            
            </div>
            }

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              />
              <label htmlFor="password">Mot de passe</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
              />
              <button type="submit">Connexion</button>
            </form>
            <div className="actions">
              <p>Vous n'avez pas de compte ? <a href="#">Inscrivez-vous</a></p>
              <p>Mot de passe oublié ? <a href="#">Réinitialisez-le</a></p>
            </div>

            <div className="oauth">
            <span className="facebook"><i className="fa-brands fa-facebook"></i></span>
            <span className="google"><i className="fa-brands fa-google"></i></span>
            <span className="twitter"><i className="fa-brands fa-twitter"></i></span>
            </div>
          </div>
       
        </Modal>
      </React.Fragment>
  )
}

export default SignInModal