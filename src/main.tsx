import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ModalProvider from './contexts/Modal/ModalProvider.tsx'
import AuthProvider from './contexts/Auth/AuthProvider.tsx'
import Modal from 'react-modal'

Modal.setAppElement('#root');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  </StrictMode>,
)
