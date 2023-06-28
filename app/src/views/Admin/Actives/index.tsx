import { useCallback, useEffect, useState } from 'react'
import { AdminProps } from '..'
import { CardTableActives } from '../../../components/Cards/CardTableActives'
import { ActiveCreate } from '../../../components/Modal/ActiveCreate'
import { ActiveDelete } from '../../../components/Modal/ActiveDelete'
import { ActiveSee } from '../../../components/Modal/ActiveSee'
import { ActiveEdit } from '../../../components/Modal/ActiveEdit'

export type Active = { [key: string]: string | number }

export const Actives = ({ permissions, apiclient }: AdminProps) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalSeeOpen, setIsModalSeeOpen] = useState(false)
  const [active, setActive] = useState<Active | null>(null)
  const [actives, setActives] = useState<Active[]>([])

  const getActives = useCallback(async () => {
    try {
      const result: Active[] = await apiclient.get('/active')
      setActives(result)
    } catch (error) {
      console.log(error)
    }
  }, [apiclient])

  useEffect(() => {
    getActives()
  }, [getActives])

  const columns = [
    'Active',
    'Model',
    'Proprietary',
    'Status',
    'Health Level',
    'Last Update',
    'Actions',
  ]

  const handleConfirmCreateModal = async (active: object) => {
    console.log({ active })
    try {
      await apiclient.post('/active', {
        ...active,
      })
      getActives()
    } catch (error) {
      console.log(error)
    } finally {
      setIsModalCreateOpen(false)
    }
  }
  const handleOpenCreateModal = () => {
    setIsModalCreateOpen(!isModalCreateOpen)
  }

  const handleEditModal = async (update: Active) => {
    try {
      await apiclient.put(`/active/${update?._id}`, {
        ...update,
      })
      getActives()
    } catch (error) {
      console.log(error)
    } finally {
      setIsModalEditOpen(!isModalEditOpen)
    }
  }

  const handleOpenDeleteModal = () => {
    setIsModalDeleteOpen(!isModalDeleteOpen)
  }
  const handleDelete = async () => {
    try {
      await apiclient.delete(`/active/${active?._id}`)
      getActives()
    } catch (error) {
      console.log(error)
    } finally {
      setIsModalSeeOpen(false)
      setIsModalDeleteOpen(false)
    }
  }

  const handleSeeModal = () => {
    setIsModalSeeOpen(!isModalSeeOpen)
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>Actives</h1>
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
        <div className='relative pb-32 pt-12'>
          <CardTableActives
            color='light'
            title='Actives'
            columns={columns}
            actives={actives}
            selectActive={(active: Active) => setActive(active)}
            onSee={handleSeeModal}
          />
        </div>
        <ActiveCreate
          isOpen={isModalCreateOpen}
          onClose={() => setIsModalCreateOpen(false)}
          onAdd={handleConfirmCreateModal}
          apiclient={apiclient}
        />
        <ActiveDelete
          isOpen={isModalDeleteOpen}
          activeName={active?.name as string}
          onClose={() => setIsModalDeleteOpen(false)}
          onDelete={handleDelete}
        />
        <ActiveSee
          isOpen={isModalSeeOpen}
          selectedRow={active}
          columns={columns}
          handleCloseModal={() => setIsModalSeeOpen(false)}
          onEdit={handleEditModal}
          onDelete={handleOpenDeleteModal}
        />
        <ActiveEdit
          isOpen={isModalEditOpen}
          columns={columns}
          selectedRow={active}
          onEdit={handleEditModal}
          handleCloseModal={() => setIsModalEditOpen(false)}
        />
      </div>
    </>
  )
}
