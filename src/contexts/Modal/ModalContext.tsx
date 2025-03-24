import { createContext } from 'react'

interface ModalContextType {
  modalIsOpen: boolean
  openModal: () => void
  closeModal: () => void
  modalSignUpIsOpen: boolean
  openSignUpModal: () => void
  closeSignUpModal: () => void
  modalArticlePostIsOpen: boolean
  openArticlePostModal: () => void
  closeArticlePostModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export default ModalContext