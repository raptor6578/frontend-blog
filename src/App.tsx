import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AppRoutes from './AppRoutes'

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
    </BrowserRouter>
  );
}

export default App
