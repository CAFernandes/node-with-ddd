type ModalProps = {
  isOpen: boolean
  row: {}
  onClose: () => void
}

export const UnitsSee = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-10'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='bg-white p-6 rounded-lg z-20'>
        <h2 className='text-xl font-bold mb-4'>Modal Title</h2>
        <p className='mb-4'>Modal content goes here...</p>
        <div className='flex justify-end'>
          <button
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2'
            onClick={onClose}
          >
            Close
          </button>
          {/* Add additional action buttons here */}
        </div>
      </div>
    </div>
  )
}
