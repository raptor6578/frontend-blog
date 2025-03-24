import { createContext } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  register: (email: string, password: string) => Promise<string | undefined>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext