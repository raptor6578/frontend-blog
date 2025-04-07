import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AppRoutes from './AppRoutes'
import Spinner from './components/Spinner/Spinner'
import './assets/css/hljs-vscode-dark.css'
import React from 'react'

const App = () => {

  return (
    <React.Fragment>
      <Layout>
        <Routes>
          {AppRoutes.map(route => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </Layout>
      <Spinner />
    </React.Fragment>
  )

}

export default App
