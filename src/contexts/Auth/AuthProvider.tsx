import React, { ReactNode, useEffect, useState } from 'react'
import AuthContext from "./AuthContext"
import * as AuthService from '../../services/authService'
import { User } from '../../types/User'

interface ModalProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
  
    if (storedToken && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('❌ Erreur de parsing du user :', error)
        localStorage.removeItem('authUser')
        localStorage.removeItem('authToken')
      }
    }
  }, [])
  
  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password)
      setIsAuthenticated(true)
      setToken(response.token)
      setUser(response.user)
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
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ login, register, logout, token, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider