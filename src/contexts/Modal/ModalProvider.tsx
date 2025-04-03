import React, { ReactNode, useState } from 'react'
import ModalContext from './ModalContext'
import { Article } from '../../types/Article'

interface ModalProviderProps {
  children: ReactNode
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {

  const [modalSignInIsOpen, setModalSignInIsOpen] = useState<boolean>(false)
  const [modalSignUpIsOpen, setModalSignUpIsOpen] = useState<boolean>(false)
  const [modalArticlePostIsOpen, setModalArticlePostIsOpen] = useState<boolean>(false)
  const [modalArticleObject, setModalArticleObject] = useState<Article | undefined>(undefined)

  const openSignInModal = () => setModalSignInIsOpen(true)
  const closeSignInModal = () => setModalSignInIsOpen(false)

  const openSignUpModal = () => setModalSignUpIsOpen(true)
  const closeSignUpModal = () => setModalSignUpIsOpen(false)

  const openArticlePostModal = (article?: Article) => {
    setModalArticleObject(article)
    setModalArticlePostIsOpen(true)
  }
  const closeArticlePostModal = () => setModalArticlePostIsOpen(false)

  return (
    <ModalContext.Provider value={{ 
      modalSignInIsOpen,
      openSignInModal, 
      closeSignInModal,
      modalSignUpIsOpen,
      openSignUpModal,
      closeSignUpModal,
      modalArticlePostIsOpen,
      openArticlePostModal,
      closeArticlePostModal,
      modalArticleObject
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider