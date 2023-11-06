import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Cait | Note',
  description: 'the black cat artificial intelligence Note page',
}

interface pageProps {
  
}

const page =async ({}: pageProps) => {
  const {userId}=auth()
  if(!userId){
      throw new Error('userId undefined')
  }
  const allNotes = await db.note.findMany({
    where:{
      userId
    }
  })
  return <div>{JSON.stringify(allNotes)}</div>
}

export default page
