import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cait | Sign Up',
  description: 'the black cat artificial intelligence ',
}

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <SignUp appearance={{ variables: { colorPrimary: '#0F172A' } }} />
    </div>
  )
}
