import { createContext } from 'react'
import { Article } from '../../types/Article'

interface ModalContextType {
  modalIsOpen: boolean
  openModal: () => void
  closeModal: () => void
  modalSignUpIsOpen: boolean
  openSignUpModal: () => void
  closeSignUpModal: () => void
  modalArticlePostIsOpen: boolean
  openArticlePostModal: (article?: Article) => void
  closeArticlePostModal: () => void
  modalArticleObject: Article | undefined
}

const ModalContext = createContext<ModalContextType | null>(null)

export default ModalContext