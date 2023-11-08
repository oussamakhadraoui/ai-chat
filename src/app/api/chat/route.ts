import db from '@/lib/db'
import { getEmbedding } from '@/lib/openai'
import { notesIndex } from '@/lib/pinecone'
import { auth } from '@clerk/nextjs/server'
import { ChatCompletionMessage } from 'openai/resources/index.mjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const messages: ChatCompletionMessage[] = body
    const messagesTrunc = messages.slice(-6)
    const embbeding = await getEmbedding(
      messagesTrunc.map((m) => m.content).join('\n')
    )
    const { userId } = auth()

    const vectorQuery = await notesIndex.query({
      vector: embbeding,
      topK: 1,
      filter: { userId },
    })

    const relevanteNote = await db.note.findMany({
     where:{
      id:{
       in: vectorQuery.matches.map((m) => m.id),
      }
     }
    })

    console.log("relevant",relevanteNote)

    const systemMsg:ChatCompletionMessage = {
     role:"system",
     content:"You are a helpful assistant that writes notes for the user and answer their questions."
    }
  } catch (error) {
    console.log(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
