import db from '@/lib/db'
import { createNoteSchema } from '@/lib/validation/note'
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
const note = await db.note.create({
  data: {
    title,
    content,
    userId
  }
})
return Response.json(note, { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
