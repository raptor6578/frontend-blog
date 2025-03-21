import { createContext } from 'react'

interface ModalContextType {
  modalIsOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export default ModalContext