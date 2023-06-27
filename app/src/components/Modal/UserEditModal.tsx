import { useState, useEffect } from 'react'
import { User } from '../../context/AuthContext'

type UserData = {
  name: string
  username: string
}

type UserEditModalProps = {
  isModalOpen: boolean
  userData: User | null
  handleClose: () => void
  handleSave: (updatedUserData: UserData) => void
  // handleResetPassword: () => void
}

export const UserEditModal = ({
  isModalOpen,
  userData,
  handleClose,
  handleSave,
}: // handleResetPassword,
UserEditModalProps) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (userData) {
      setName(userData.name)
      setUsername(userData.username)
    }
  }, [userData])

  const handleSaveClick = () => {
    const updatedUserData: UserData = {
      ...userData,
      name,
      username,
    }
    handleSave(updatedUserData)
  }

  if (!isModalOpen || !userData) {
    return null
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
      <div className='bg-white p-4 rounded shadow'>
        <h2 className='text-lg font-bold mb-2'>Editar Usuário</h2>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nome'
          className='border border-gray-300 rounded px-3 py-2 mb-4'
        />
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Nome de Usuário'
          className='border border-gray-300 rounded px-3 py-2 mb-4'
        />
        <div className='flex justify-between'>
          {/* <button
            type='button'
            onClick={handleResetPassword}
            className='text-red-500 hover:text-red-700 font-bold'
          >
            Redefinir Senha
          </button> */}
          <div>
            <button
              type='button'
              onClick={handleClose}
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2'
            >
              Cancelar
            </button>
            <button
              type='button'
              onClick={handleSaveClick}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
