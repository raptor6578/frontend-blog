import React from 'react'
import './Spinner.css'
import useSpinner from '../../contexts/Spinner/useSpinner'

const Spinner: React.FC = () => {

  const { spinnerIsOpen } = useSpinner()

  return (
    <div className="loading-spinner" style={{ display: spinnerIsOpen ? 'flex' : 'none' }}>
      <div className="spinner"></div>
    </div>
  )
}

export default Spinner