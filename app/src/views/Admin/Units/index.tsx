import { useCallback, useEffect, useState } from 'react'
import { UnitsDelete } from '../../../components/Modal/UnitsDelete'
import { AdminProps } from '..'
import { UnitsCreate } from '../../../components/Modal/UnitsCreate'
import { CardTableUnits } from '../../../components/Cards/CardTableUnits'
import { UnitsEdit } from '../../../components/Modal/UnitsEdit'

export type Unit = {
  _id: string
  name: string
  company_id: string
  created_at: string
  updated_at?: string
}

export const Units = ({ permissions, apiclient }: AdminProps) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalSeeOpen, setIsModalSeeOpen] = useState(false)
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
  const [units, setUnits] = useState<Unit[]>([])
  const [row, setRow] = useState<Unit | null>(null)
  const columns = ['Name', 'Total Actives', 'Actions']

  const getUnits = useCallback(async () => {
    const result: Unit[] = await apiclient.get(`/unit`)
    setUnits(result)
  }, [apiclient])
  useEffect(() => {
    getUnits()
  }, [getUnits])

  const handleOpenCreateModal = () => {
    setIsModalCreateOpen(true)
  }
  const handleCloseCreateModal = () => {
    setIsModalCreateOpen(false)
  }
  const handleConfirmCreateModal = async (name: string) => {
    try {
      await apiclient.post('/unit', {
        name,
      })
    } catch (error) {
      console.log(error)
    } finally {
      getUnits()
      setIsModalCreateOpen(false)
    }
  }

  const handleCloseDeleteModal = () => {
    setIsModalDeleteOpen(false)
  }
  const handleConfirmDeleteModal = () => {
    console.log('Confirmação realizada com sucesso!')
    setIsModalDeleteOpen(false)
  }
  const handleRemove = async (id: string) => {
    try {
      await apiclient.delete(`/unit/${id}`)
      getUnits()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (unit: Unit) => {
    setRow(unit)
    setIsModalSeeOpen(true)
  }
  const handleConfirmEditModal = async (name: string) => {
    try {
      await apiclient.put(`/unit/${row?._id}`, {
        name,
      })
    } catch (error) {
      console.log(error)
    } finally {
      getUnits()
      setRow(null)
      setIsModalSeeOpen(false)
    }
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>Units</h1>
        {permissions.includes('unit:create') && (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded'
            onClick={handleOpenCreateModal}
          >
            Add <i className='fas fa-plus'></i>
          </button>
        )}
      </div>
      <div className='relative pb-32 pt-12 overflow-auto'>
        <CardTableUnits
          color='light'
          columns={columns}
          title='Resume'
          units={units}
          onEdit={handleEdit}
          onDelete={handleRemove}
        />
        <UnitsEdit
          name={row?.name || ''}
          isModalOpen={isModalSeeOpen}
          handleClose={() => setIsModalSeeOpen(false)}
          handleConfirm={handleConfirmEditModal}
        />
        <UnitsDelete
          message='Are you sure you want to delete this unit?'
          isOpen={isModalDeleteOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDeleteModal}
        />
        <UnitsCreate
          isOpen={isModalCreateOpen}
          onClose={handleCloseCreateModal}
          onConfirm={handleConfirmCreateModal}
        />
      </div>
    </>
  )
}
