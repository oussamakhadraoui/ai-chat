import { CreateNoteSchemaType, createNoteSchema } from '@/lib/validation/note'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import LoadingButton from './LoadingButton'
import { useRouter } from 'next/navigation'
import { Note } from '@prisma/client'
interface AddNoteDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  noteToEdit?: Note
}

const AddNoteDialog = ({ open, setOpen, noteToEdit }: AddNoteDialogProps) => {



  const  [deleteInProgress,setDeleteInprogress]= useState<boolean>(false)
  const { refresh } = useRouter()
  const form = useForm<CreateNoteSchemaType>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || '',
      content: noteToEdit?.content || '',
    },
  })
  async function onSubmit(input: CreateNoteSchemaType) {
    try {
      if (noteToEdit) {
        const response = await fetch('/api/note', {
          method: 'PUT',
          body: JSON.stringify({
            id: noteToEdit.id,
            title: input.title,
            content: input.content,
          }),
        })
        if (!response.ok) {
          throw new Error(
            'Something went wrong in register this note! ' + response.statusText
          )
        }
      } else {
        const response = await fetch('/api/note', {
          method: 'POST',
          body: JSON.stringify(input),
        })
        if (!response.ok) {
          throw new Error(
            'Something went wrong in register this note! ' + response.statusText
          )
        }
        form.reset()
      }

      refresh()
      setOpen(false)
    } catch (error) {
      console.log(error)
      alert('Something went wrong!')
      //use toast
    }
  }
async function onDelete() {
  if(!noteToEdit){
    return;
  }
  setDeleteInprogress(true)
  try {
    const response = await fetch('/api/note', {
      method: 'DELETE',
      body: JSON.stringify({ id: noteToEdit?.id }),
    })
    if (!response.ok) {
      throw new Error(
        'Something went wrong in register this note! ' + response.statusText
      )
    }
  
  } catch (error) {
    console.log(error)
    alert('Something went wrong!')
    //use toast
  }finally{
      refresh()
      setOpen(false)
    setDeleteInprogress(false)
  }
}
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{!noteToEdit?  "Adding Note":"Edit Note"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            {/* space-y-3 add vertical space without adding the flex box */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Title'
                      className='input-bordered input w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Note Content'
                      className='input-bordered input w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='gap-1 sm:gap-0'>
              {noteToEdit && (
                <LoadingButton
                  variant={'destructive'}
                  loading={deleteInProgress}
                  disabled={form.formState.isSubmitting}
                  onClick={onDelete}
                  type='button'
                >
                  Delete Note
                </LoadingButton>
              )}
              <LoadingButton
                loading={form.formState.isSubmitting}
                type='submit'
                disabled={deleteInProgress}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNoteDialog
