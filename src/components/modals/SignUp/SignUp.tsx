import React, { useState } from 'react'
import './SignUp.css'
import Modal from 'react-modal'
import useAuth from '../../../contexts/Auth/useAuth'
import useModal from '../../../contexts/Modal/useModal'
import useSpinner from '../../../contexts/Spinner/useSpinner'
import { signUpValidator } from '../../../validators/authValidator'
import { If, Then, For } from '../../ui/directives'
import axios from 'axios'

const SignUp = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string>('')
    const addErrors = (message: string) => setErrors(errors => [...errors, message])
    const clearErrors = () => setErrors([])
    const { register } = useAuth()!
    const { modalSignUpIsOpen, closeSignUpModal } = useModal()!
    const { openSpinner, closeSpinner } = useSpinner()!
    
    const afterOpenModal = () => { 
      clearErrors()
      setSuccess('')
    } 

    const validatorErrors = (email: string, password: string, passwordConfirm: string) => {
      const validatorErrors = signUpValidator(email, password, passwordConfirm)
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
        const response = await register(email, password)
        if (response) setSuccess(response)
        closeSpinner()
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
      if (validatorErrors(email, password, passwordConfirm)) return
      auth(email, password)
    }

    return (
      <React.Fragment>
        <Modal
          contentLabel="Inscription"
          isOpen={modalSignUpIsOpen}
          onRequestClose={closeSignUpModal}
          onAfterOpen={afterOpenModal}
          className="signup"
          overlayClassName="overlay"
        >
          <div className="close-modal">
            <button onClick={closeSignUpModal}>X</button>
          </div>
          <div className="container-signup">
            <h2>Inscription</h2>
            <If condition={errors.length > 0}>
              <Then>
                <div className='message error'>
                <For each={errors} render={(error, index) => (
                  <p key={index}><span role="img" aria-label="Erreur">❌</span> {error}</p>
                )} />
                </div>
              </Then>
            </If>
            <If condition={success}>
              <Then>
                <div className='message success'>
                  <p><span role="img" aria-label="Succès">✅</span> {success}</p>
                </div>
              </Then>
            </If>
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
              <label htmlFor="password">Confirmez votre mot de passe</label>
              <input 
                type="password" 
                id="passwordConfirm" 
                name="passwordConfirm" 
                value={passwordConfirm} 
                className="input-text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)} 
              />
              <button className="blue-button" type="submit">Inscription</button>
            </form>
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

export default SignUp