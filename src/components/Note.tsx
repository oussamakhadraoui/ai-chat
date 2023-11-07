'use client'
import { auth } from '@clerk/nextjs'
import { Note as NodeModal } from '@prisma/client'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import AddNoteDialog from './AddNoteDialog'

interface NoteProps {
  note: NodeModal
}

const Note = ({ note }: NoteProps) => {

  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)
  const wasUpdated =
    new Date(note.updatedAt).getTime() > new Date(note.createdAt).getTime()

  const createdUpdatedTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString()

  return (
    <>
      <Card className='cursor-pointer hover:shadow-lg transition-shadow' onClick={()=>setShowEditDialog(true)}>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedTimestamp}
            {wasUpdated && (
              <span className='ml-2 text-sm text-gray-500'>{' Updated'}</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='whitespace-pre-line'>{note.content}</p>
        </CardContent>
      </Card>
      <AddNoteDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        noteToEdit={note}
      />
    </>
  )
}

export default Note
