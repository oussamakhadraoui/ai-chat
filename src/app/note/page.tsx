import Note from '@/components/Note'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Cait | Note',
  description: 'the black cat artificial intelligence Note page',
}

interface pageProps {}

const page = async ({}: pageProps) => {
  const { userId } = auth()
  if (!userId) {
    throw new Error('userId undefined')
  }
  const allNotes = await db.note.findMany({
    where: {
      userId,
    },
  })
  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
      {allNotes.map((note) => (
        <Note key={note.id} note={note} />
      ))}

      {allNotes.length === 0 && (
        <div className='col-span-full text-center'>
          You don't have any notes.
        </div>
      )}
    </div>
  )
}

export default page
