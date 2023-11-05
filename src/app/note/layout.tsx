import NavBar from '@/components/NavBar'
import React, { ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const layout = ({ children }: layoutProps) => {
  return (
    <div>
      <NavBar />
      <main className='m-auto max-w-7xl p-4'>{children}</main>
    </div>
  )
}

export default layout
