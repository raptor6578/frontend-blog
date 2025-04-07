import Modal from 'react-modal'
import SignInForm from '../../forms/SignInForm'
import useRequestMessages from '../../../hooks/useRequestMessages'
import useModal from '../../../contexts/Modal/useModal'
import { If, Then, For } from '../../ui/directives'

import './SignIn.css'

const SignIn = () => {

    const { modalSignInIsOpen, closeSignInModal } = useModal()!
    const messages = useRequestMessages()
    const { errors, clearErrors } = messages

    const afterOpenModal = () => {
      clearErrors() 
    } 
  
    return (
        <Modal
          contentLabel="Connexion"
          isOpen={modalSignInIsOpen}
          onRequestClose={closeSignInModal}
          onAfterOpen={afterOpenModal}
          className="signin"
          overlayClassName="overlay"
        >
          <div className="close-modal">
            <button onClick={closeSignInModal}>X</button>
          </div>
          <div className="container-signin">
            <h2>Connexion</h2>
            <If condition={errors.length > 0}>
              <Then>
                <div className='message error'> 
                  <For each={errors} render={(error, index) => (
                    <p key={index}><span role="img" aria-label="Erreur">❌</span> {error}</p>
                  )} />
                </div>
              </Then>
            </If>
            <SignInForm messages={messages} />
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
  )
}

export default SignIn