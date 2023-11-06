import Image from 'next/image'
import logo from '../../public/logo.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
export default function Home() {
  const {userId}= auth()
  if(userId) redirect('/note')
  return (
    <main className='flex flex-col items-center justify-center h-screen gap-5'>
      <div className='flex items-center gap-4'>
        <Image src={logo} alt='Cait' width={100} height={100} />
        <span className='font-extrabold tracking-tight text-4xl lg:text-5xl '></span>
      </div>
      <p className='text-center max-w-prose'>
        An intellingent Black cat assistant AI integration built with open ai,
        Pinecone, Next.js, Shadcn Ui, clerk, and more.{' '}
      </p>
      <Button size={'lg'} asChild>
        <Link href={'/note'}>Open</Link>
      </Button>
    </main>
  )
}
