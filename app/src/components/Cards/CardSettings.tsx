import { useState } from 'react'
import { User } from '../../context/AuthContext'
import { UserProfile } from '../Modal/UserProfiel'

type CardSettingsProps = {
  permissions: string[]
  users: User[]
  createUser: () => void
  onDelete: (id: string | undefined) => void
  onEdit: (user: User) => Promise<void>
}

export const CardSettings = ({
  permissions,
  users,
  createUser,
  onDelete,
  onEdit,
}: CardSettingsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const onSee = (user: User) => {
    setUser(user)
    setIsModalOpen(true)
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>Users Management</h1>
        {permissions.includes('user:create') && (
          <button
            className='bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
            type='button'
            onClick={() => createUser()}
          >
            Add User
          </button>
        )}
      </div>
      <div className='relative pb-32 pt-12 overflow-auto'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded'>
          <div className='block w-full overflow-x-auto'>
            {/* Projects table */}
            <table className='items-center w-full bg-transparent border-collapse'>
              <thead>
                <tr>
                  <th className='px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left marker:bg-gray-50 text-gray-500 border-gray-100'>
                    Name
                  </th>
                  <th className='px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'>
                    Company
                  </th>
                  <th className='px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User, index) => (
                  <tr key={index}>
                    <td className='px-6 align-middle  border-t-0 border-l-0 border-r-0 text-xs whitespace-nowrap p-4 bg-gray-100 text-gray-500 border-gray-100'>
                      {user.name}
                    </td>
                    <td className='px-6 align-middle  border-t-0 border-l-0 border-r-0 text-xs whitespace-nowrap p-4 bg-gray-100 text-gray-500 border-gray-100'>
                      {user?.relation?.name || 'Administrador'}
                    </td>
                    <td className='px-6 align-middle  border-t-0 border-l-0 border-r-0 text-xs whitespace-nowrap p-4 bg-gray-100 text-gray-500 border-gray-100'>
                      <i
                        className='fas fa-eye text-green-500 mr-2 cursor-pointer'
                        onClick={() => onSee(user)}
                      ></i>
                      <i
                        className='fas fa-edit text-blue-500 mr-2 cursor-pointer'
                        onClick={() => onEdit(user)}
                      ></i>
                      <i
                        className='fas fa-trash text-red-500 mr-2 cursor-pointer'
                        onClick={() => onDelete(user?._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UserProfile
        isOpen={isModalOpen}
        userData={user}
        handleClose={() => {
          setIsModalOpen(false)
          setUser(null)
        }}
      />
    </>
  )
}
