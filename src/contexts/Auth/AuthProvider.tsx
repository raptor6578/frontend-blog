import React, { ReactNode, useEffect, useState } from 'react'
import AuthContext from "./AuthContext"
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
  
  const signIn = async (token: string, user: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setToken(token)
    setUser(user)
    setIsAuthenticated(true)
  }

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, token, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider