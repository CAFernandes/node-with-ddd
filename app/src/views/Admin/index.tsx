import { useState } from 'react'
import { MenuLateral } from './MenuLateral'
import { Actives } from './Actives'
import { Home } from './Home'
import { Units } from './Units'
import { Users } from './Users'
import { Companys } from './Companys'
import { ApiClient } from '../../services/ApiClient'

export type AdminProps = {
  permissions: string[]
  apiclient: ApiClient
}

export const Admin = ({ permissions, apiclient }: AdminProps) => {
  const views = ['Home', 'Companys', 'Units', 'Actives', 'Users']
  const [activeView, setActiveView] = useState(views[0])
  return (
    <main className='grid grid-cols-[min-content_1fr] h-screen'>
      <MenuLateral
        views={views}
        active={activeView}
        changeView={setActiveView}
      />
      <section className='bg-gray-100 w-full p-4 overflow-auto'>
        {activeView == 'Home' && (
          <Home permissions={permissions} apiclient={apiclient} />
        )}
        {activeView == 'Companys' && (
          <Companys permissions={permissions} apiclient={apiclient} />
        )}
        {activeView == 'Actives' && (
          <Actives permissions={permissions} apiclient={apiclient} />
        )}
        {activeView == 'Units' && (
          <Units permissions={permissions} apiclient={apiclient} />
        )}
        {activeView == 'Users' && (
          <Users permissions={permissions} apiclient={apiclient} />
        )}
      </section>
    </main>
  )
}
