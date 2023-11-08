"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../public/logo.jpeg'
import { UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import {Plus} from 'lucide-react'
import AddNoteDialog from './AddNoteDialog'
import ThemeToggleButton from './ThemeToggleButton'
import {dark} from '@clerk/themes'
import { useTheme } from 'next-themes'
import AiChatButton from './AiChatButton'
interface NavBarProps {}

const NavBar = ({}: NavBarProps) => {

  const {theme}= useTheme()
  const [showAddNoteDialog,setShowNoteDialog]= useState<boolean>(false)
  return (
    <>
      <div className='p-4 shadow'>
        <div className='max-w-7xl mx-auto flex flex-wrap gap-3 items-center justify-between '>
          <Link href={'/note'} className='flex items-center gap-1'>
            <Image src={logo} alt='Cait' width={40} height={40} />
            <span className='font-bold'>Cait</span>
          </Link>
          <div className='flex items-center gap-2'>
            <UserButton
              afterSignOutUrl='/'
              appearance={{
                baseTheme:theme==="dark"?dark :undefined,
                variables: { colorPrimary: '#0F172A' },
                elements: { avatarBox: { width: '2.5rem', height: '2.5rem' } },
              }}
            />
            <ThemeToggleButton/>
            <Button onClick={()=>setShowNoteDialog(true)}>
              <Plus size={20} className='mr-2p' />
              Add Note
            </Button>
            <AiChatButton/>
          </div>
        </div>
      </div>
      <AddNoteDialog open={showAddNoteDialog} setOpen={setShowNoteDialog}/>
    </>
  )
}

export default NavBar
