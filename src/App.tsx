import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AppRoutes from './AppRoutes'
import SignIn from './components/modals/SignIn/SignIn'
import SignUp from './components/modals/SignUp/SignUp'
import Spinner from './components/Spinner/Spinner'
import Article from './components/modals/Article/Article'
import './assets/css/hljs-vscode-dark.css'

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
      <SignIn />
      <SignUp />
      <Article />
      <Spinner />
    </BrowserRouter>
  )
  
}

export default App
