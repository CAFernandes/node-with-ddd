import { useCallback, useEffect, useState } from 'react'
import { AuthContext, User } from './context/AuthContext'
import { Auth } from './views/Auth'
import { Admin } from './views/Admin'
import { ApiClient } from './services/ApiClient'

type loginResponse = {
  accessToken: string
  refreshToken: string
  user: User
  permissions: string[]
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [permissions, setPermissions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [apiclient] = useState(
    new ApiClient(import.meta.env.VITE_API_URL as string)
  )
  const login = async (username: string, password: string) => {
    try {
      const { accessToken, refreshToken, user, permissions } =
        (await apiclient.post('/auth/login', {
          username,
          password,
        })) as loginResponse
      setPermissions(permissions)
      apiclient.setAccessToken(accessToken)
      apiclient.setRefreshToken(refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    } catch (error: any) {
      console.log(error)
      setError('Invalid username or password')
    }
  }
  const handleClearError = () => {
    setError(null)
  }
  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }
  const loadPermissions = useCallback(async () => {
    try {
      const permissions = (await apiclient.get('/auth/permissions')) as string[]
      setPermissions(permissions)
    } catch (error: any) {
      console.log(error)
    }
  }, [apiclient])
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      loadPermissions()
    }
  }, [loadPermissions])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <main className='w-screen h-screen max-h-screen'>
        {!user ? (
          <Auth login={login} error={error} clearError={handleClearError} />
        ) : (
          <Admin permissions={permissions} apiclient={apiclient} />
        )}
      </main>
    </AuthContext.Provider>
  )
}

export default App
