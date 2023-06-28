import { useState } from 'react'
import { ActiveSee } from '../Modal/ActiveSee'
import { defineHealth, defineState } from '../../services/utils'
import { Active } from '../../views/Admin/Actives'

type Color = 'light' | 'dark'
type Column = string[]
type CardTableProps = {
  color?: Color
  title?: string
  columns?: Column
  actives: Active[]
  selectActive: (active: Active) => void
  onSee: () => void
}

export const CardTableActives = ({
  color = 'dark',
  title,
  columns,
  actives,
  selectActive,
  onSee,
}: CardTableProps) => {
  const handleSee = (active: Active) => {
    selectActive(active)
    onSee()
  }

  if (!columns || !actives) return null
  return (
    <div
      className={
        'flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 ' +
        (color === 'light' ? 'text-gray-700' : 'text-white bg-gray-900')
      }
    >
      <h3 className='text-lg font-semibold mb-4'>{title}</h3>
      <div className='w-full overflow-x-auto'>
        {actives &&
          actives.map((row, index) => (
            <div
              className='flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 py-2 cursor-pointer'
              onClick={() => handleSee(row)}
              key={index}
            >
              <div className='mb-2 sm:mb-0 sm:mr-6'>
                <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                  {columns[0]}
                </h5>
                <span className='text-sm sm:text-base font-semibold'>
                  {row.name as string}
                </span>
              </div>
              <div className='mb-2 sm:mb-0 sm:mr-6'>
                <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                  {columns[3]}
                </h5>
                <span className='text-sm sm:text-base font-semibold'>
                  {defineState(row.status as string)}
                </span>
              </div>
              <div className='mb-2 sm:mb-0 sm:mr-6'>
                <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                  {columns[4]}
                </h5>
                <span className='text-sm sm:text-base font-semibold'>
                  {defineHealth(row.health_level as string)}
                </span>
              </div>
              <div className='mb-2 sm:mb-0 sm:mr-6'>
                <h5 className='text-xs sm:text-sm text-gray-500 uppercase font-semibold mb-1'>
                  {columns[5]}
                </h5>
                <span className='text-sm sm:text-base font-semibold'>
                  {new Date(
                    (row.updated_at || row.created_at) as string
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
