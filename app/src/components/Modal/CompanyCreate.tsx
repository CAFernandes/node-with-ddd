import { useState } from 'react'

type CompanyCreateProps = {
  isModalOpen: boolean
  handleClose: () => void
  handleConfirm: (name: string) => void
}

export const CompanyCreate = ({
  isModalOpen,
  handleClose,
  handleConfirm,
}: CompanyCreateProps) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const handleSend = () => {
    if (!name) {
      setError('Nome é obrigatório')
      return
    }
    handleConfirm(name)
    setName('')
  }

  if (!isModalOpen) return null
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
      <div className='bg-white p-8 rounded shadow'>
        <h2 className='text-lg font-bold mb-4'>New Company</h2>

        {/* Parte 2: Campo de entrada */}
        <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder='Company'
          className='border border-gray-300 rounded px-3 py-2 mb-4'
        />
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <div className='flex justify-around'>
          <button
            type='button'
            onClick={handleClose}
            className='bg-red-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded mr-2'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => handleSend()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
