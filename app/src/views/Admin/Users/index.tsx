import { useCallback, useEffect, useState } from 'react'
import { AdminProps } from '..'
import { CardSettings } from '../../../components/Cards/CardSettings'
import { Company } from '../Companys'
import { UserCreate, UserData } from '../../../components/Modal/UserCreate'
import { User } from '../../../context/AuthContext'
import { UserEditModal } from '../../../components/Modal/UserEditModal'

type lUser = {
  relation: null | Company
  _id: string
  name: string
  username: string
}

export const Users = ({ permissions, apiclient }: AdminProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [companys, setCompanys] = useState<Company[]>([])
  const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState(false)
  const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false)
  const [userData, setUserData] = useState<User | null>(null)
  const loadCompanys = useCallback(async () => {
    const companys: Company[] = await apiclient.get('/company')
    setCompanys(companys)
  }, [apiclient])
  const loadUsers = useCallback(async () => {
    const users: lUser[] = await apiclient.get('/user')
    setUsers(users)
  }, [apiclient])
  const handleCreateUserConfirm = async (userData: UserData) => {
    if (!userData.company) alert('Choose a company')
    if (!userData.name) alert('Name is required')
    if (!userData.username) alert('Username is required')
    if (!userData.password) alert('Password is required')
    try {
      await apiclient.post('/user', userData)
      loadUsers()
      setIsModalCreateUserOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id: string | undefined) => {
    if (!id) return
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return

    await apiclient.delete(`/user/${id}`)
    loadUsers()
  }
  const handleEdit = async (user: User) => {
    setUserData(user)
    setIsModalEditUserOpen(true)
  }
  const handleUpdate = async (userData: User) => {
    try {
      delete userData.relation
      delete userData.created_at

      await apiclient.put(`/user/${userData._id}`, userData)
      loadUsers()
      setIsModalEditUserOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadCompanys()
    loadUsers()
  }, [loadCompanys, loadUsers])
  return (
    <div className='relative pb-32 pt-12'>
      <CardSettings
        permissions={permissions}
        users={users}
        createUser={() => setIsModalCreateUserOpen(true)}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <UserCreate
        isModalOpen={isModalCreateUserOpen}
        handleClose={() => setIsModalCreateUserOpen(false)}
        handleConfirm={handleCreateUserConfirm}
        companys={companys}
      />
      <UserEditModal
        isModalOpen={isModalEditUserOpen}
        handleSave={handleUpdate}
        handleClose={() => {
          setIsModalEditUserOpen(false)
          setUserData(null)
        }}
        userData={userData}
      />
    </div>
  )
}
