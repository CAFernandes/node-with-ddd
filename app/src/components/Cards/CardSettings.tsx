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
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-gray-700 text-xl font-bold'>
              Users Management
            </h6>
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
        </div>
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
        <UserProfile
          isOpen={isModalOpen}
          userData={user}
          handleClose={() => {
            setIsModalOpen(false)
            setUser(null)
          }}
        />
        {/* <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
          <form>
            <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              User Information
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Username
                  </label>
                  <input
                    type='text'
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    defaultValue='lucky.jesse'
                  />
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Email address
                  </label>
                  <input
                    type='email'
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    defaultValue='jesse@example.com'
                  />
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    defaultValue='Lucky'
                  />
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    defaultValue='Jesse'
                  />
                </div>
              </div>
            </div>

            <hr className='mt-6 border-b-1 border-gray-300' />

            <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              Contact Information
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-12/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    defaultValue='Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09'
                  />
                </div>
              </div>
              <div className='w-full lg:w-4/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    City
                  </label>
                  <input
                    type='email'
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    defaultValue='New York'
                  />
                </div>
              </div>
              <div className='w-full lg:w-4/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Country
                  </label>
                  <input
                    type='text'
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    defaultValue='United States'
                  />
                </div>
              </div>
              <div className='w-full lg:w-4/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Postal Code
                  </label>
                  <input
                    type='text'
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    defaultValue='Postal Code'
                  />
                </div>
              </div>
            </div>

            <hr className='mt-6 border-b-1 border-gray-300' />

            <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              About Me
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-12/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    About me
                  </label>
                  <textarea
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    defaultValue='A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source.'
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div> */}
      </div>
    </>
  )
}
