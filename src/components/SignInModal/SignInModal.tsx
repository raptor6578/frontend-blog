import React, { useState } from 'react'
import './SignInModal.css'
import Modal from 'react-modal'
import useAuth from '../../contexts/Auth/useAuth'
import useModal from '../../contexts/Modal/useModal'
import { signInValidator } from '../../validators/authValidator'
import axios from 'axios'

const SignInModal: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState({ email: '', password: '' })
    
    const { login } = useAuth()!
    const { modalIsOpen, closeModal } = useModal()!

    const handleSetErrors = (params: {message: string, type: string}) => {
      setErrors(prev => ({ ...prev, [params.type]: params.message }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setErrors({ email: '', password: '' })
      signInValidator(email, password).forEach(error => handleSetErrors(error))
      try {
        await login(email, password)
        closeModal()
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          handleSetErrors(error.response.data as {message: string, type: string})
        }
      }
    }

    return (
      <React.Fragment>
        <Modal
          contentLabel="Connexion"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="signin"
          overlayClassName="overlay"
        >
          <div className="close-modal">
            <button onClick={closeModal}>X</button>
          </div>
          <div className="container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email {errors.email && <span className='error'>{errors.email}</span>}</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              />
              <label htmlFor="password">Mot de passe {errors.password && <span className='error'>{errors.password}</span>}</label>
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