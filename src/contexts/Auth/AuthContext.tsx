import { createContext } from 'react'
import { User } from '../../types/User'

interface AuthContextType {
  login: (email: string, password: string) => void
  register: (email: string, password: string) => Promise<string | undefined>
  logout: () => void
  token: string | null
  user: User | null
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext