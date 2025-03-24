import React, { ReactNode, useState } from 'react'
import ModalContext from './ModalContext'

interface ModalProviderProps {
  children: ReactNode
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {

  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const [modalSignUpIsOpen, setModalSignUpIsOpen] = useState<boolean>(false)
  const [modalArticlePostIsOpen, setModalArticlePostIsOpen] = useState<boolean>(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const openSignUpModal = () => setModalSignUpIsOpen(true)
  const closeSignUpModal = () => setModalSignUpIsOpen(false)

  const openArticlePostModal = () => setModalArticlePostIsOpen(true)
  const closeArticlePostModal = () => setModalArticlePostIsOpen(false)

  return (
    <ModalContext.Provider value={{ 
      modalIsOpen,
      openModal, 
      closeModal,
      modalSignUpIsOpen,
      openSignUpModal,
      closeSignUpModal,
      modalArticlePostIsOpen,
      openArticlePostModal,
      closeArticlePostModal
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider