import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Modal from 'react-modal'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ModalProvider from './contexts/Modal/ModalManager.tsx'
import AuthProvider from './contexts/Auth/AuthProvider.tsx'
import SpinnerProvider from './contexts/Spinner/SpinnerProvider.tsx'


Modal.setAppElement('#root');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SpinnerProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </SpinnerProvider>
    </AuthProvider>
  </StrictMode>
)
