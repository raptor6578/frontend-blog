import React, { ReactNode, useState } from 'react'
import ModalContext from './ModalContext'
import { Article } from '../../types/Article'

interface ModalProviderProps {
  children: ReactNode
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {

  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const [modalSignUpIsOpen, setModalSignUpIsOpen] = useState<boolean>(false)
  const [modalArticlePostIsOpen, setModalArticlePostIsOpen] = useState<boolean>(false)
  const [modalArticleObject, setModalArticleObject] = useState<Article | undefined>(undefined)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const openSignUpModal = () => setModalSignUpIsOpen(true)
  const closeSignUpModal = () => setModalSignUpIsOpen(false)

  const openArticlePostModal = (article?: Article) => {
    setModalArticleObject(article)
    setModalArticlePostIsOpen(true)
  }
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
      closeArticlePostModal,
      modalArticleObject
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider