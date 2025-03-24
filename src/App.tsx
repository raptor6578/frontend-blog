import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AppRoutes from './AppRoutes'
import SignIn from './components/Modals/SignIn/SignIn'
import SignUp from './components/Modals/SignUp/SignUp'
import Spinner from './components/Spinner/Spinner'
import ArticlePost from './components/Modals/ArticlePost/ArticlePost'

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
      <ArticlePost />
      <Spinner />
    </BrowserRouter>
  )
  
}

export default App
