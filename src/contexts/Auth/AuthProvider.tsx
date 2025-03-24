import React, { ReactNode, useEffect, useState } from 'react'
import AuthContext from "./AuthContext"
import * as AuthService from '../../services/authService'

interface ModalProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setIsAuthenticated(true)
    }
  }, [])
  
  const login = async (email: string, password: string) => {
    try {
      await AuthService.login(email, password)
      setIsAuthenticated(true)
    } catch (error) {
      if (error) {
        setIsAuthenticated(false)
        throw error
      }
    }
  }

  const register = async (email: string, password: string) => {
    try {
      return await AuthService.register(email, password)
    } catch (error) {
      if (error) {
        throw error
      }
    }
  }

  const logout = () => {
    AuthService.logout()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider