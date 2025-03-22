import { createContext } from 'react'

interface SpinnerContextType {
  spinnerIsOpen: boolean
  openSpinner: () => void
  closeSpinner: () => void
}

const SpinnerContext = createContext<SpinnerContextType | null>(null)

export default SpinnerContext