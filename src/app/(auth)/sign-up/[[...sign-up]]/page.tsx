import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <SignUp appearance={{ variables: { colorPrimary: '#0F172A' } }} />
    </div>
  )
}
