import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ApiClient } from '../../services/ApiClient'
import { Active } from '../../views/Admin/Actives'

type ActiveCreateProps = {
  isOpen: boolean
  onAdd: (active: object) => Promise<void>
  onClose: () => void
  apiclient: ApiClient
}
type Unit = {
  _id: string
  name: string
}

export const ActiveCreate = ({
  isOpen,
  onAdd,
  onClose,
  apiclient,
}: ActiveCreateProps) => {
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [model, setModel] = useState('')
  const [proprietary, setProprietary] = useState('')
  const [status, setStatus] = useState('')
  const [healthLevel, setHealthLevel] = useState(0)
  const [companyId, setCompanyId] = useState(user?.relation?._id || '')
  const [unitId, setUnitId] = useState('')
  const [image, setImage] = useState<null | File>(null)

  const [units, setUnits] = useState<Unit[]>([])
  const getUnits = useCallback(async () => {
    const result: Unit[] = await apiclient.get(`/unit`)
    setUnits(result)
  }, [apiclient])
  useEffect(() => {
    getUnits()
  }, [getUnits])
  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    })
  }
  const handleSubmit = async () => {
    if (!name) {
      alert('Please add a name')
      return
    }
    if (!description) {
      alert('Please add a description')
      return
    }
    if (!model) {
      alert('Please add a model')
      return
    }
    if (!proprietary) {
      alert('Please add a proprietary')
      return
    }
    if (!status) {
      alert('Select a status')
      return
    }
    if (!healthLevel) {
      alert('Please add a health level')
      return
    }
    if (!unitId) {
      alert('Select a unit')
      return
    }
    if (!image) {
      alert('Please add a image')
      return
    }
    const newAsset = {
      name,
      description,
      model,
      proprietary,
      status,
      health_level: healthLevel,
      company_id: companyId,
      unit_id: unitId,
      image: {
        data: await toBase64(image),
        name: image?.name,
      },
    }
    onAdd(newAsset)

    setName('')
    setDescription('')
    setModel('')
    setProprietary('')
    setStatus('')
    setHealthLevel(0)
    setCompanyId('')
    setUnitId('')
    setImage(null)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    setImage(file)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center z-10'>
      <div className='absolute inset-0 bg-gray-800 opacity-50'></div>
      <div className='bg-white p-4 rounded-lg z-50 max-w-md w-full'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold'>Cadastrar Ativo</h3>
          <button
            className='text-red-500 hover:text-red-700 cursor-pointer'
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className='mb-4'>
          <div className='flex mb-2'>
            <div className='w-1/2 mr-2'>
              <label className='block text-gray-700 font-bold' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                id='name'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='w-1/2 ml-2'>
              <label
                className='block text-gray-700 font-bold'
                htmlFor='description'
              >
                Description
              </label>
              <input
                type='text'
                id='description'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='flex mb-2'>
            <div className='w-1/2 mr-2'>
              <label className='block text-gray-700 font-bold' htmlFor='model'>
                Model
              </label>
              <input
                type='text'
                id='model'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
            <div className='w-1/2 ml-2'>
              <label
                className='block text-gray-700 font-bold'
                htmlFor='proprietary'
              >
                Proprietary
              </label>
              <input
                type='text'
                id='proprietary'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                value={proprietary}
                onChange={(e) => setProprietary(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='flex mb-2'>
            <div className='w-1/2 mr-2'>
              <label className='block text-gray-700 font-bold' htmlFor='status'>
                Status
              </label>
              <select
                id='status'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value=''>Select a status</option>
                <option value='Alert'>Alert</option>
                <option value='Stopped'>Stoped</option>
                <option value='Running'>Running</option>
              </select>
            </div>
            <div className='w-1/2 ml-2'>
              <label
                className='block text-gray-700 font-bold'
                htmlFor='healthLevel'
              >
                Health Level
              </label>
              <div className='flex items-center'>
                <input
                  type='range'
                  min={0}
                  max={100}
                  id='healthLevel'
                  className='w-1/2 border border-gray-300 rounded-l focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  value={healthLevel}
                  onChange={(e) => setHealthLevel(Number(e.target.value))}
                  required
                />
                <div className='px-3 py-2 border-gray-300 rounded-r'>
                  {healthLevel}%
                </div>
              </div>
            </div>
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 font-bold'
              htmlFor='companyId'
            >
              Company
            </label>
            <input
              disabled={true}
              type='text'
              id='companyId'
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={user?.relation?.name}
              required
            />
          </div>
          <div className='mb-2'>
            <label className='block text-gray-700 font-bold' htmlFor='unitId'>
              Unit
            </label>
            <select
              id='unitId'
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={unitId}
              onChange={(e) => setUnitId(e.target.value)}
              required
            >
              <option value=''>Selecione o status</option>
              {units.map((unit) => (
                <option key={unit._id} value={unit._id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold' htmlFor='image'>
            Image
          </label>
          <input
            type='file'
            id='image'
            accept='image/*'
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            onChange={handleImageChange}
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-700'
          onClick={handleSubmit}
        >
          Resgister
        </button>
      </div>
    </div>
  )
}
