import { defineHealth, defineState } from '../../services/utils'
import { Active } from '../../views/Admin/Actives'

type ActiveSeeProps = {
  isOpen: boolean
  columns?: string[]
  selectedRow?: Active | null
  handleCloseModal: () => void
  onEdit: (active: Active) => void
  onDelete: (active: Active) => void
}
export const ActiveSee = ({
  isOpen,
  columns,
  selectedRow,
  handleCloseModal,
  onEdit,
  onDelete,
}: ActiveSeeProps) => {
  if (!isOpen || !columns || !selectedRow) return null
  return (
    <div className='fixed inset-0 flex items-center justify-center z-10'>
      <div className='absolute inset-0 bg-gray-800 opacity-50'></div>
      <div className='bg-white w-1/2 p-4 rounded-lg z-20'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-4'>
            <h3 className='text-lg font-semibold'>Detalhes</h3>
            <div>
              <i
                className='fas fa-edit text-blue-500 mr-2 cursor-pointer'
                onClick={() => onEdit(selectedRow)}
              ></i>
              <i
                className='fas fa-trash text-red-500 mr-2 cursor-pointer'
                onClick={() => onDelete(selectedRow)}
              ></i>
            </div>
          </div>
          <button
            className='text-red-500 hover:text-red-700 cursor-pointer'
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
        <div className='mb-2 sm:mb-0 sm:mr-6'>
          <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
            {columns[0]}
          </h5>
          <span className='text-base font-semibold'>
            {selectedRow.name as string}
          </span>
        </div>
        <div className='mb-2 sm:mb-0 sm:mr-6'>
          <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
            Description
          </h5>
          <span className='text-base font-semibold'>
            {selectedRow.description as string}
          </span>
        </div>
        <div className='mb-2 sm:mb-0 sm:mr-6'>
          <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
            {columns[1]}
          </h5>
          <span className='text-base font-semibold'>
            {selectedRow.model as string}
          </span>
        </div>
        <div className='mb-2 sm:mb-0 sm:mr-6'>
          <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
            {columns[2]}
          </h5>
          <span className='text-base font-semibold'>
            {selectedRow.proprietary as string}
          </span>
        </div>
        <div className='mb-2 sm:mb-0 sm:mr-6'>
          <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
            {columns[3]}
          </h5>
          <span className='text-base font-semibold'>
            {defineState(selectedRow.status as string)}
          </span>
        </div>
        <div className='mb-2 sm:mb-0 sm:mr-6'>
          <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
            {columns[4]}
          </h5>
          <span className='text-base font-semibold'>
            {defineHealth(selectedRow.health_level as string)}
          </span>
        </div>
        <div className='mb-2 sm:mb-0 sm:mr-6'>
          <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
            {columns[5]}
          </h5>
          <span className='text-base font-semibold'>
            {new Date(
              (selectedRow.updated_at || selectedRow.created_at) as string
            ).toLocaleString()}
          </span>
        </div>
        <div className='mt-4 flex items-center justify-center'>
          <img
            src={`${import.meta.env.VITE_API_URL as string}/image/${
              selectedRow.image as string
            }`}
            alt={selectedRow.name as string}
            className='w-auto rounded-lg max-h-36'
          />
        </div>
      </div>
    </div>
  )
}
