import React from 'react'
import './ActionButton.css'

interface ActionButtonTypes {
  icon: string
  text?: string | number
  onClick?: () => void
  disabled?: boolean
}

const ActionButton:React.FC<ActionButtonTypes> = ({ icon, text, onClick, disabled }) => {
  return (
    <button className="action-button" onClick={onClick} disabled={disabled}>
      {text}<i className={`fa ${icon}`}></i>
    </button>
  )
}

export default ActionButton;