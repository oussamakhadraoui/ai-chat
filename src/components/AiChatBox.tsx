import React from 'react'
import { useChat } from 'ai/react'
import { cn } from '@/lib/utils'
import { XCircle } from 'lucide-react'
import { Button } from './ui/button'
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
        <div className='h-full'>Messages</div>
        <form onSubmit={handleSubmit} className='m-3 flex gap-1'>
          <input
            className='w-full rounded border p-2'
            placeholder='Type your message here...'
            value={input}
            onChange={handleInputChange}
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
