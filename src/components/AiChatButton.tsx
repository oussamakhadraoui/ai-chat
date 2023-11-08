import React from 'react'
import AiChatBox from './AiChatBox'
import { Button } from './ui/button'
import { Bot } from 'lucide-react'

interface AiChatButtonProps {}

const AiChatButton = ({}: AiChatButtonProps) => {
  const [chatBoxOpen, setChatBoxOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)}>
       
       <Bot size={20}  className='mr-2'/>
       Ai Chat</Button>
      <AiChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  )
}

export default AiChatButton
