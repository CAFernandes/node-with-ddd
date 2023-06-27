import { useState } from 'react'
import { Company } from '../../views/Admin/Companys'

type UserCreateProps = {
  isModalOpen: boolean
  companys: Company[]
  handleClose: () => void
  handleConfirm: (userData: UserData) => void
}

export type UserData = {
  name: string
  username: string
  password: string
  company: string
}

export const UserCreate = ({
  isModalOpen,
  companys,
  handleClose,
  handleConfirm,
}: UserCreateProps) => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    username: '',
    password: '',
    company: '',
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSend = () => {
    if (
      !userData.name ||
      !userData.username ||
      !userData.password ||
      !userData.company
    ) {
      // Verifica se todos os campos foram preenchidos
      return
    }

    handleConfirm(userData)
    setUserData({
      name: '',
      username: '',
      password: '',
      company: '',
    })
  }

  if (!isModalOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
      <div className='bg-white p-8 rounded shadow w-80'>
        <h2 className='text-lg font-bold mb-4'>Cadastrar Usuário</h2>
        <input
          type='text'
          name='name'
          value={userData.name}
          onChange={handleChange}
          placeholder='Nome'
          className='border border-gray-300 rounded px-3 py-2 mb-4 w-full'
        />
        <input
          type='text'
          name='username'
          value={userData.username}
          onChange={handleChange}
          placeholder='Nome de Usuário'
          className='border border-gray-300 rounded px-3 py-2 mb-4 w-full'
        />
        <input
          type='password'
          name='password'
          value={userData.password}
          onChange={handleChange}
          placeholder='Senha'
          className='border border-gray-300 rounded px-3 py-2 mb-4 w-full'
        />
        <select
          name='company'
          value={userData.company}
          onChange={handleChange}
          className='border border-gray-300 rounded px-3 py-2 mb-4 w-full'
        >
          <option value=''>Selecione a empresa</option>
          {companys &&
            companys.map((company) => (
              <option value={company._id} key={company._id}>
                {company.name}
              </option>
            ))}
        </select>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={handleClose}
            className='bg-red-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded mr-2'
          >
            Cancelar
          </button>
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleSend}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  )
}
