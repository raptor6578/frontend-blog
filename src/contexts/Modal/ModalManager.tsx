import { useState } from 'react'
import Modal from 'react-modal'
import { ModalContext, ModalType } from './ModalContext'
import SignIn from '../../components/SignIn/SignIn'
import SignUp from '../../components/SignUp/SignUp'
import Article from '../../components/ArticleEditor/ArticleEditor'
import { Article as ArticleType } from '../../types/Article'

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [modalProps, setModalProps] = useState<unknown>(undefined)

  const openModal = (type: ModalType, props?: unknown) => {
    setModalType(type)
    setModalProps(props)
  }

  const closeModal = () => {
    setModalType(null)
    setModalProps(undefined)
  }

  const getModalContent = () => {
    switch (modalType) {
      case 'signIn':
        return <SignIn {...(modalProps as object)} />
      case 'signUp':
        return <SignUp {...(modalProps as object)} />
      case 'articleEditor':
        return <Article article={modalProps as ArticleType} />
      default:
        return null
    }
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        isOpen={!!modalType}
        onRequestClose={closeModal}
        className={modalType || ''}
        overlayClassName="overlay"
      >
        {getModalContent()}
      </Modal>
    </ModalContext.Provider>
  )
}

export default ModalProvider