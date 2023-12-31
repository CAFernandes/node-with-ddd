import { ChangeEvent, useState } from 'react'

type AuthProps = {
  login: (username: string, password: string) => void
  error: string | null
  clearError: () => void
}

export const Auth = ({ login, error, clearError }: AuthProps) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleLogin = () => {
    clearError()
    login(username, password)
  }
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <div className='container mx-auto px-4 h-full v'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0'>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <div className='relative w-full mb-3 mt-10'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Username
                  </label>
                  <input
                    type='text'
                    onChange={handleUsernameChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    placeholder='Username'
                  />
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Password
                  </label>
                  <div className='flex items-center justify-end'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      className='border-0 pl-3 py-3 pr-10 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Password'
                    />
                    <i
                      className={`fas ${
                        showPassword ? 'fa-eye' : 'fa-eye-slash'
                      } text-gray-500 mr-2 cursor-pointer fixed pl-1 top-1/2 transform -translate-y-1/2`}
                      onClick={handleShowPassword}
                    ></i>
                  </div>
                </div>

                {error && (
                  <div className='bg-red-500 text-white font-bold py-2 px-4 rounded'>
                    {error}
                  </div>
                )}
                <div className='text-center mt-6'>
                  <button
                    className='bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                    type='button'
                    onClick={handleLogin}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
