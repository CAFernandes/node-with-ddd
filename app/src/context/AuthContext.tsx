import { createContext } from 'react'
import { Company } from '../views/Admin/Companys'

export type User = {
  name: string
  username: string
  company?: string
  relation?: Company
}

interface AuthContextData {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
})
