type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  message: string
}

export const UnitsDelete = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-10'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='bg-white p-6 rounded-lg z-20'>
        <h2 className='text-xl font-bold mb-4'>Confirmar</h2>
        <p className='mb-4'>{message}</p>
        <div className='flex justify-end'>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2'
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
