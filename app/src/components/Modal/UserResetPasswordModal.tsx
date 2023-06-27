import React, { useState } from 'react'

type UserResetPasswordModalProps = {
  username: string
  handleClose: () => void
  handleResetPassword: (username: string, newPassword: string) => void
}

const UserResetPasswordModal: React.FC<UserResetPasswordModalProps> = ({
  username,
  handleClose,
  // handleResetPassword,
}) => {
  const [newPassword, setNewPassword] = useState('')

  // const handleResetPasswordClick = () => {
  //   handleResetPassword(username, newPassword)
  // }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
      <div className='bg-white p-4 rounded shadow'>
        <h2 className='text-lg font-bold mb-2'>Redefinir Senha</h2>
        <div className='mb-4'>
          <span className='font-bold'>Usuário: </span>
          {username}
        </div>
        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='Nova Senha'
          className='border border-gray-300 rounded px-3 py-2 mb-4'
        />
        <div className='flex justify-around'>
          <button
            type='button'
            onClick={handleClose}
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2'
          >
            Cancel
          </button>
          {/* <button
            type='button'
            onClick={handleResetPasswordClick}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Redefinir
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default UserResetPasswordModal
