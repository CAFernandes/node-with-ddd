type User = {
  relation?: {
    _id: string
    name: string
    created_at: string
  }
  _id: string
  name: string
  username: string
  created_at: string
}

type UserModalProps = {
  isOpen: boolean
  userData: User | null
  handleClose: () => void
}

export const UserProfile = ({
  isOpen,
  userData,
  handleClose,
}: UserModalProps) => {
  if (!isOpen || !userData) return null
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
      <div className='bg-white p-4 rounded shadow'>
        <h2 className='text-lg font-bold mb-2'>Informações do Usuário</h2>
        <div className='mb-2'>
          <span className='font-bold'>Nome: </span>
          {userData.name}
        </div>
        <div className='mb-2'>
          <span className='font-bold'>Nome de Usuário: </span>
          {userData.username}
        </div>
        {userData?.relation?._id && (
          <div className='mb-2'>
            <span className='font-bold'>Empresa: </span>
            {userData?.relation?.name}
          </div>
        )}
        <div className='mb-2'>
          <span className='font-bold'>Data de Criação: </span>
          {new Date(userData.created_at).toLocaleString()}
        </div>
        <button
          className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
          onClick={handleClose}
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
