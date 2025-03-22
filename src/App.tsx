import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AppRoutes from './AppRoutes'
import SignUpModal from './components/SignInModal/SignInModal'
import Spinner from './components/Spinner/Spinner'

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        {AppRoutes.map(route => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </Layout>
      <SignUpModal />
      <Spinner />
    </BrowserRouter>
  )
  
}

export default App
