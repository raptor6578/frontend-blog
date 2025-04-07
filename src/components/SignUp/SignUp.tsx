import SignUpForm from '../forms/SignUpForm'
import useRequestMessages from '../../hooks/useRequestMessages'
import { If, Then, For } from '../ui/directives'
import './SignUp.css'
import React from 'react'

const SignUp = () => {

  const messages = useRequestMessages()
  const { errors, /*clearErrors,*/ success, /*clearSuccess*/ } = messages

  /*const afterOpenModal = () => {
    clearErrors()
    clearSuccess() 
  } */

  return (
      <React.Fragment>
        <div className="close-modal">
          <button>X</button>
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
          <SignUpForm messages={messages} />
          <div className="oauth">
          <span className="facebook"><i className="fa-brands fa-facebook"></i></span>
          <span className="google"><i className="fa-brands fa-google"></i></span>
          <span className="twitter"><i className="fa-brands fa-twitter"></i></span>
          </div>
        </div>
      </React.Fragment>
  )
}

export default SignUp