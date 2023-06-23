import { Company } from '../../views/Admin/Companys'

type Color = 'light' | 'dark'
type Column = string[]

type CardTableProps = {
  color?: Color
  title?: string
  columns?: Column
  companys?: Company[]
  onEdit: (id: string, name: string) => void
  onDelete: (id: string, name: string) => void
}

export function CardTableCompanies({
  color = 'dark',
  title,
  columns,
  companys,
  onEdit,
  onDelete,
}: CardTableProps) {
  const dateToLocale = (date: Date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString()
  }
  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-gray-900 text-white')
        }
      >
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-gray-700' : 'text-white')
                }
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                {columns &&
                  columns.map((column, index) => (
                    <th
                      className={
                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                        (color === 'light'
                          ? 'bg-gray-50 text-gray-500 border-gray-100'
                          : 'bg-gray-800 text-gray-300 border-gray-700')
                      }
                      key={index}
                    >
                      {column}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {companys &&
                companys.map((row, index) => (
                  <tr
                    key={index}
                    title={`Last Update: ${dateToLocale(
                      row.updated_at || row.created_at
                    )}`}
                  >
                    <td
                      className={
                        'px-6 align-middle border border-solid py-3 border-t-0 border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ' +
                        (color === 'light'
                          ? 'bg-gray-100 text-gray-500 border-gray-100'
                          : 'bg-gray-800 text-gray-300 border-gray-700')
                      }
                      key={index}
                    >
                      {row.name}
                    </td>
                    <td
                      className={
                        'border border-solid py-3 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ' +
                        (color === 'light'
                          ? 'bg-gray-100 text-gray-500 border-gray-100'
                          : 'bg-gray-800 text-gray-300 border-gray-700')
                      }
                      key={index}
                    >
                      {row.total_units}
                    </td>
                    <td
                      className={
                        'border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ' +
                        (color === 'light'
                          ? 'bg-gray-100 text-gray-500 border-gray-100'
                          : 'bg-gray-800 text-gray-300 border-gray-700')
                      }
                      key={index}
                    >
                      {row.total_actives}
                    </td>
                    <td
                      className={
                        'border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ' +
                        (color === 'light'
                          ? 'bg-gray-100 text-gray-500 border-gray-100'
                          : 'bg-gray-800 text-gray-300 border-gray-700')
                      }
                    >
                      <i
                        className='fas fa-edit text-blue-500 mr-2 cursor-pointer'
                        onClick={() =>
                          row._id && row.name && onEdit(row._id, row.name)
                        }
                      ></i>
                      <i
                        className='fas fa-trash text-red-500 mr-2 cursor-pointer'
                        onClick={() => row._id && onDelete(row._id, row.name)}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
