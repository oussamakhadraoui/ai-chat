import db from '@/lib/db'
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from '@/lib/validation/note'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parseResult = createNoteSchema.safeParse(body)

    if (!parseResult.success) {
      console.log(parseResult)
      return new Response('Invalid Request', { status: 400 })
    }

    const { title, content } = parseResult.data

    const { userId } = auth()

    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }
    console.log('ok')
    const note = await db.note.create({
      data: {
        title,
        content,
        userId,
      },
    })
    return Response.json(note, { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const parseResult = updateNoteSchema.safeParse(body)

    if (!parseResult.success) {
      console.log(parseResult)
      return new Response('Invalid Request', { status: 400 })
    }

    const { id, title, content } = parseResult.data
    const note = await db.note.findUnique({ where: { id } })
    if (!note) {
      return new Response('Note not found', { status: 404 })
    }
    const { userId } = auth()

    if (!userId || note.userId !== userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const updatedNote = await db.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    })
    return Response.json(updatedNote, { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const parseResult = deleteNoteSchema.safeParse(body)

    if (!parseResult.success) {
      console.log(parseResult)
      return new Response('Invalid Request', { status: 400 })
    }

    const { id } = parseResult.data
    const note = await db.note.findUnique({ where: { id } })
    if (!note) {
      return new Response('Note not found', { status: 404 })
    }
    const { userId } = auth()

    if (!userId || note.userId !== userId) {
      return new Response('Unauthorized', { status: 401 })
    }
    await db.note.delete({
      where: { id },
    })
    return Response.json({message:"note deleted"}, { status: 204 })
  } catch (error) {
    console.log(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
