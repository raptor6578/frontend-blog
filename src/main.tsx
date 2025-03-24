import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ModalProvider from './contexts/Modal/ModalProvider.tsx'
import AuthProvider from './contexts/Auth/AuthProvider.tsx'
import Modal from 'react-modal'
import SpinnerProvider from './contexts/Spinner/SpinnerProvider.tsx'
import { StrictMode } from 'react'


Modal.setAppElement('#root');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SpinnerProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SpinnerProvider>
    </AuthProvider>
  </StrictMode>
)
