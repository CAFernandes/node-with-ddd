type DeleteConfirmationProps = {
  isOpen: boolean
  activeName: string
  onDelete: () => void
  onClose: () => void
}

export const ActiveDelete = ({
  isOpen,
  activeName,
  onDelete,
  onClose,
}: DeleteConfirmationProps) => {
  if (!isOpen) return null

  const handleDelete = () => {
    onDelete()
    onClose()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50'>
      <div className='bg-white p-8 rounded shadow'>
        <h2 className='text-lg font-bold mb-4'>Confirm Deletion</h2>
        <p>Are you sure you want to delete the company "{activeName}"?</p>
        <div className='mt-4 flex justify-end'>
          <button
            type='button'
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type='button'
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
