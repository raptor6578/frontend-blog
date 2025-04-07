import { createContext } from 'react'
import { User } from '../../types/User'

interface AuthContextType {
  signIn: (token: string, user: User) => void
  signOut: () => void
  token: string | null
  user: User | null
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext