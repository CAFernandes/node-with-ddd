import { createContext } from 'react'

export type User = {
  name: string
  username: string
  company: string
  permissions?: string[]
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
