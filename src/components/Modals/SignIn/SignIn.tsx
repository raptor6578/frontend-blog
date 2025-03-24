import React, { useState } from 'react'
import './SignIn.css'
import Modal from 'react-modal'
import useAuth from '../../../contexts/Auth/useAuth'
import useModal from '../../../contexts/Modal/useModal'
import useSpinner from '../../../contexts/Spinner/useSpinner'
import { signInValidator } from '../../../validators/authValidator'
import axios from 'axios'

const SignIn: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])
    const addErrors = (message: string) => setErrors(errors => [...errors, message])
    const clearErrors = () => setErrors([])
    const { login } = useAuth()!
    const { modalIsOpen, closeModal } = useModal()!
    const { openSpinner, closeSpinner } = useSpinner()!
    const afterOpenModal = () => clearErrors() 

    const validatorErrors = (email: string, password: string) => {
      const validatorErrors = signInValidator(email, password)
      validatorErrors.forEach(error => addErrors(error.message))
      if (validatorErrors.length > 0) { 
        return true 
      } else {
        return false
      }
    } 

    const auth = async (email: string, password: string) => {
      try {
        openSpinner()
        await login(email, password)
        closeSpinner()
        closeModal()
      } catch (error) {
        if (axios.isAxiosError(error)) {
          closeSpinner()
           const errorMessage = error.response ? error.response.data.message : "Une erreur réseau est survenue."
          addErrors(errorMessage)
        }
      }
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      clearErrors()
      if (validatorErrors(email, password)) return
      auth(email, password)
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
                className="input-text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              />
              <label htmlFor="password">Mot de passe</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                className="input-text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
              />
              <button className="blue-button" type="submit">Connexion</button>
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

export default SignIn