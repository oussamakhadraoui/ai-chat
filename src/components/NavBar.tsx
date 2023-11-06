import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../public/logo.png'
import { UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import {Plus} from 'lucide-react'
interface NavBarProps {}

const NavBar = ({}: NavBarProps) => {
  return (
    <div className='p-4 shadow'>
      <div className='max-w-7xl mx-auto flex flex-wrap gap-3 items-center justify-between '>
       <Link href={"/note"} className='flex items-center gap-1'>
        <Image src={logo} alt='Cait' width={40} height={40}/>
        <span className='font-bold'>Cait</span>
       </Link>
       <div className='flex items-center gap-2'>
          <UserButton afterSignOutUrl='/' appearance={{ variables: { colorPrimary: '#0F172A' },
        elements:{avatarBox:{width:"2.5rem",height:"2.5rem"}} }}/>
        <Button>
          <Plus size={20} className='mr-2p'/>
          Add Note</Button>
       </div>
      </div>
    </div>
  )
}

export default NavBar
