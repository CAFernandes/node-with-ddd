import { useState } from 'react'

type ActiveEditProps = {
  isOpen: boolean
  columns?: string[]
  selectedRow?: { [key: string]: string | number } | null
  handleCloseModal: () => void
  onEdit: (updatedValues: {
    [key: string]: string | number | object
  }) => Promise<void>
}
export const ActiveEdit = ({
  isOpen,
  columns,
  selectedRow,
  handleCloseModal,
  onEdit,
}: ActiveEditProps) => {
  const [editedValues, setEditedValues] = useState<{
    [key: string]: string | number | object
  }>({})

  const handleFieldValueChange = (
    field: string,
    value: string | number | object
  ) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const handleSaveChanges = async () => {
    // Extract only the edited values
    if (Object.keys(editedValues).length === 0) return
    const updatedValues: { [key: string]: string | number | object } = {
      ...selectedRow,
      ...editedValues,
    }

    await onEdit(updatedValues)
    handleCloseModal()
  }
  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    })
  }
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]
      handleFieldValueChange('image', {
        data: await toBase64(image),
        name: image?.name,
      })
    }
  }

  if (!isOpen || !columns || !selectedRow) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center z-10'>
      <div className='absolute inset-0 bg-gray-800 opacity-50'></div>
      <div className='bg-white w-1/2 p-4 rounded-lg z-20'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-4'>
            <h3 className='text-lg font-semibold'>Edit Active</h3>
          </div>
          <button
            className='text-red-500 hover:text-red-700 cursor-pointer'
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
        <div className='mb-4'>
          <div className='flex mb-2'>
            <div className='w-1/2 mr-2'>
              <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                {columns[0]}
              </h5>
              <input
                type='text'
                value={editedValues.name || selectedRow.name}
                onChange={(e) => handleFieldValueChange('name', e.target.value)}
                className='text-base font-semibold border border-gray-300 rounded-md px-3 py-2 w-full'
              />
            </div>
            <div className='w-1/2 mr-2'>
              <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                Description
              </h5>
              <input
                type='text'
                value={
                  (editedValues.description ||
                    selectedRow.description) as string
                }
                onChange={(e) =>
                  handleFieldValueChange('description', e.target.value)
                }
                className='text-base font-semibold border border-gray-300 rounded-md px-3 py-2 w-full'
              />
            </div>
          </div>
          <div className='flex mb-2'>
            <div className='w-1/2 mr-2'>
              <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                {columns[1]}
              </h5>
              <input
                type='text'
                value={(editedValues.model || selectedRow.model) as string}
                onChange={(e) =>
                  handleFieldValueChange('model', e.target.value)
                }
                className='text-base font-semibold border border-gray-300 rounded-md px-3 py-2 w-full'
              />
            </div>
            <div className='w-1/2 mr-2'>
              <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                {columns[2]}
              </h5>
              <input
                type='text'
                value={
                  (editedValues.proprietary ||
                    selectedRow.proprietary) as string
                }
                onChange={(e) =>
                  handleFieldValueChange('proprietary', e.target.value)
                }
                className='text-base font-semibold border border-gray-300 rounded-md px-3 py-2 w-full'
              />
            </div>
          </div>
          <div className='flex mb-2'>
            <div className='w-1/2 mr-2'>
              <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                {columns[3]}
              </h5>
              <select
                id='status'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                value={(editedValues.status || selectedRow.status) as string}
                onChange={(e) =>
                  handleFieldValueChange('status', e.target.value)
                }
                required
              >
                <option value=''>Select a status</option>
                <option value='Alert'>Alert</option>
                <option value='Stopped'>Stoped</option>
                <option value='Running'>Running</option>
              </select>
            </div>
            <div className='w-1/2 mr-2'>
              <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                {columns[4]}
              </h5>
              <div className='flex items-center'>
                <input
                  type='range'
                  min={0}
                  max={100}
                  id='healthLevel'
                  className='w-1/2 border border-gray-300 rounded-l focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  value={
                    (editedValues.healthLevel ||
                      selectedRow.healthLevel) as number
                  }
                  onChange={(e) =>
                    handleFieldValueChange('healthLevel', e.target.value)
                  }
                  required
                />
                <div className='px-3 py-2 border-gray-300 rounded-r'>
                  {
                    (editedValues.healthLevel ||
                      selectedRow.healthLevel) as string
                  }
                  %
                </div>
              </div>
            </div>
          </div>
          <div className='w-full mr-2'>
            <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
              Image
            </h5>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='text-base font-semibold'
            />
          </div>
        </div>
        <div className='mt-4 flex items-center justify-center'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md'
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
