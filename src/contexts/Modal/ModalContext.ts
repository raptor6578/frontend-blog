import { createContext } from 'react'

export type ModalType = 'signIn' | 'signUp' | 'articleEditor'

export interface ModalContextType {
  openModal: (type: ModalType, props?: unknown) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)