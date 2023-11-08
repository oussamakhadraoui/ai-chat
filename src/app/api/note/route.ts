import db from '@/lib/db'
import { getEmbedding } from '@/lib/openai'
import { notesIndex } from '@/lib/pinecone'
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

    const emebedding = await getEmbeddingForNote(title, content)
    const note = await db.$transaction(async (tx) => {
      const note = await tx.note.create({
        data: {
          title,
          content,
          userId,
        },
      })
      await notesIndex.upsert([
        {
          id: note.id,
          values: emebedding,
          metadata: { userId },
        },
      ])
      return note
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
    return Response.json({ message: 'note deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

async function getEmbeddingForNote(title: string, content: string | undefined) {
  return getEmbedding(title + '\n\n' + content ?? '')
}
