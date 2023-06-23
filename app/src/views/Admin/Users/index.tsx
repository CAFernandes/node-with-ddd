import { useCallback, useEffect, useState } from 'react'
import { AdminProps } from '..'
import { CardSettings } from '../../../components/Cards/CardSettings'
import { Company } from '../Companys'

type lUser = {
  relation: null | Company
  _id: string
  name: string
  username: string
}

export const Users = ({ permissions, apiclient }: AdminProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [companys, setCompanys] = useState<Company[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const loadCompanys = useCallback(async () => {
    const companys: Company[] = await apiclient.get('/company')
    setCompanys(companys)
  }, [apiclient])
  const loadUsers = useCallback(async () => {
    const users: lUser[] = await apiclient.get('/user')
    setUsers(users)
  }, [apiclient])
  const handleConfirm = async (userData: UserData) => {
    await apiclient.post('/user', userData)
    loadUsers()
    setIsModalOpen(false)
  }
  const handleDelete = async (id: string) => {
    await apiclient.delete(`/user/${id}`)
    loadUsers()
  }
  useEffect(() => {
    loadCompanys()
    loadUsers()
  }, [loadCompanys, loadUsers])
  return (
    <div className='relative pb-32 pt-12'>
      <CardSettings users={users} />
    </div>
  )
}
