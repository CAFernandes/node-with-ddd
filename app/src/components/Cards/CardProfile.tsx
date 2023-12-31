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

type CardProfileProps = {
  user: User
}

export const CardProfile = ({ user }: CardProfileProps) => {
  return (
    <>
      <div className='bg-white p-4 rounded shadow'>
        <h2 className='text-lg font-bold mb-2'>Informações do Usuário</h2>
        <div className='mb-2'>
          <span className='font-bold'>Nome: </span>
          {user.name}
        </div>
        <div className='mb-2'>
          <span className='font-bold'>Nome de Usuário: </span>
          {user.username}
        </div>
        <div className='mb-2'>
          <span className='font-bold'>Empresa: </span>
          {user?.relation?.name}
        </div>
        <div className='mb-2'>
          <span className='font-bold'>Data de Criação: </span>
          {new Date(user.created_at).toLocaleString()}
        </div>
      </div>
    </>
  )
}
