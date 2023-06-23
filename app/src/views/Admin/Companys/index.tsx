import { useCallback, useEffect, useState } from 'react'
import { AdminProps } from '..'
import { CardTableCompanies } from '../../../components/Cards/CardTableCompanys'
import { CompanyCreate } from '../../../components/Modal/CompanyCreate'
import { CompanyEdit } from '../../../components/Modal/CompanyEdit'
import { CompanyDelete } from '../../../components/Modal/CompanyDelete'

export type Company = {
  _id: string
  name: string
  created_at: Date
  total_units: number
  total_actives: number
  updated_at?: Date
}

export const Companys = ({ permissions, apiclient }: AdminProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [companys, setCompanys] = useState<Company[]>([])
  const [name, setName] = useState('')
  const [id, setId] = useState('')

  const columns = ['Name', 'Total Units', 'Total Actives', 'Actions']

  const handleEdit = (id: string, name: string) => {
    setId(id)
    setName(name)
    setIsEditModalOpen(true)
  }
  const handleRemove = (id: string, name: string) => {
    setId(id)
    setName(name)
    setIsDeleteModalOpen(true)
  }

  const handleCreate = async (name: string) => {
    try {
      await apiclient.post('/company', { name })
      loadCompanys()
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreateModalOpen(false)
    }
  }
  const handleUpdate = async (changeName: string) => {
    if (name == changeName) return
    try {
      await apiclient.put(`/company/${id}`, { name: changeName })
      loadCompanys()
    } catch (error) {
      console.log(error)
    } finally {
      setId('')
      setName('')
      setIsEditModalOpen(false)
    }
  }
  const handleDelete = async () => {
    try {
      await apiclient.delete(`/company/${id}`)
      loadCompanys()
    } catch (error) {
      console.log(error)
    } finally {
      setId('')
      setName('')
      setIsDeleteModalOpen(false)
    }
  }
  const loadCompanys = useCallback(async () => {
    try {
      const companys: Company[] = await apiclient.get('/company')
      setCompanys(companys)
    } catch (error) {
      console.log(error)
    }
  }, [apiclient])
  useEffect(() => {
    loadCompanys()
  }, [loadCompanys])

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>Companys</h1>
        {permissions.includes('company:create') && (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded'
            onClick={() => setIsCreateModalOpen(!isCreateModalOpen)}
          >
            Add <i className='fas fa-plus'></i>
          </button>
        )}
      </div>
      <div className='relative pb-32 pt-12'>
        <CardTableCompanies
          color='light'
          columns={columns}
          title='Resume'
          companys={companys}
          onEdit={handleEdit}
          onDelete={handleRemove}
        />
      </div>
      <CompanyCreate
        isModalOpen={isCreateModalOpen}
        handleClose={() => setIsCreateModalOpen(!isCreateModalOpen)}
        handleConfirm={handleCreate}
      />
      <CompanyEdit
        name={name}
        isModalOpen={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(!isEditModalOpen)}
        handleConfirm={handleUpdate}
      />
      <CompanyDelete
        isOpen={isDeleteModalOpen}
        companyName={name}
        onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        onDelete={handleDelete}
      />
    </>
  )
}
