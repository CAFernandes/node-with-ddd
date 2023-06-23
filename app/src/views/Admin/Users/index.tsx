import { AdminProps } from '..'
import { CardSettings } from '../../../components/Cards/CardSettings'

export const Users = ({ permissions, apiclient }: AdminProps) => {
  return (
    <div>
      <h1 className='text-4xl font-bold'>Users</h1>
      <div className='relative pb-32 pt-12'>
        <CardSettings />
      </div>
    </div>
  )
}
