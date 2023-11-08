import React, { useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { cn } from '@/lib/utils'
import { Bot, Trash, XCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Message } from 'ai'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { Input } from './ui/input'
interface AiChatBoxProps {
  open: boolean
  onClose: () => void
}

const AiChatBox = ({ onClose, open }: AiChatBoxProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat()

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])
  const lastMsgIsUser = messages[messages.length - 1]?.role === 'user'
  return (
    <div
      className={cn(
        'bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36',
        open ? 'fixed' : 'hidden'
      )}
    >
      <button onClick={onClose} className='mb-1 ms-auto block'>
        <XCircle size={30} />
      </button>
      <div className='flex h-[600px] flex-col rounded bg-background border shadow-xl'>
        <div className='h-full mt-3 px-3 overflow-y-auto' ref={scrollRef}>
          {messages.map((m) => {
            return <ChatMsg key={m.id} message={m} />
          })}
          {isLoading && lastMsgIsUser && (
            <ChatMsg message={{ role: 'assistant', content: '...' }} />
          )}
          {error&&(
           <ChatMsg message={{role:"assistant",content:"something went wrong please try again."}}/>
          )}
          {!error &&messages.length===0&&(
           <div className='flex h-full items-center justify-center gap-3'>
            <Bot className='animate-bounce' />
            <p>Ask ai question about your note</p>
           </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className='m-3 flex gap-1'>
          <Button
            title='clear chat'
            variant={'outline'}
            size={'icon'}
            onClick={() => setMessages([])}
            className='shrink-0'
            type='button'
          >
            <Trash />
          </Button>
          <Input
            className='w-full rounded border p-2'
            placeholder='Type your message here...'
            value={input}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <Button type='submit' disabled={isLoading}>
            send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AiChatBox

function ChatMsg({
  message: { role, content },
}: {
  message: Pick<Message, 'role' | 'content'>
}) {
  const { user } = useUser()
  const isAiMsg = role === 'assistant'
  return (
    <div
      className={cn(
        'mb-3 flex items-center',
        isAiMsg ? 'justify-start' : 'justify-end'
      )}
    >
      {isAiMsg && <Bot className='mr-2 shrink-0' />}
      <p
        className={cn(
          'whitespace-pre-line rounded-md border px-3 py-2',
          isAiMsg
            ? 'bg-background text-background-foreground'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {content}
      </p>
      {!isAiMsg && user?.imageUrl && (
        <Image
          src={user?.imageUrl}
          width={40}
          height={40}
          alt={'user'}
          className='ml-2 rounded-full'
        />
      )}
    </div>
  )
}
