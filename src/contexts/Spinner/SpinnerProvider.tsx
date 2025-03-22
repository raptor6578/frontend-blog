import React, { ReactNode, useState } from 'react'
import SpinnerContext from './SpinnerContext'

interface SpinnerProviderProps {
  children: ReactNode
}

const SpinnerProvider: React.FC<SpinnerProviderProps> = ({ children }) => {
  const [spinnerIsOpen, setIsOpen] = useState<boolean>(false)

  const openSpinner = () => setIsOpen(true)
  const closeSpinner = () => setIsOpen(false)

  return (
    <SpinnerContext.Provider value={{ spinnerIsOpen, openSpinner, closeSpinner }}>
      {children}
    </SpinnerContext.Provider>
  )
}

export default SpinnerProvider