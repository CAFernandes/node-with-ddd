export const defineState = (state = '') => {
  if (state == 'Alerta') {
    return (
      <>
        <i className='fas fa-circle text-orange-500 mr-2'></i> Alert
      </>
    )
  }
  if (state == 'Parado') {
    return (
      <>
        <i className='fas fa-circle text-red-500 mr-2'></i> Stoped
      </>
    )
  }
  return (
    <>
      <i className='fas fa-circle text-teal-500 mr-2'></i> Running
    </>
  )
}
export const defineHealth = (healthLevel = '0') => {
  return (
    <div className='flex items-center'>
      <span className='mr-2'>{healthLevel}%</span>
      <div className='relative w-full'>
        <div className='overflow-hidden h-2 text-xs flex rounded bg-red-200'>
          <div
            style={{ width: `${healthLevel}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${defineHeathGravity(
              healthLevel
            )}`}
          ></div>
        </div>
      </div>
    </div>
  )
}
const defineHeathGravity = (healthLevel = '0') => {
  const level = parseInt(healthLevel)
  if (isNaN(level)) {
    return 'bg-gray-500'
  }
  if (level < 30) {
    return 'bg-red-500'
  }
  if (level < 60) {
    return 'bg-orange-500'
  }
  return 'bg-green-500'
}
