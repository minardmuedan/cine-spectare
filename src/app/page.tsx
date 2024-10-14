import SignOutButton from '@/components/auth/signout-button'
import { validateSession } from '@/lib/auth/session/validate-session'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center gap-3 pt-20 text-center">
      <p className="text-sm text-muted-foreground">finding something to watch? this might be -</p>
      <h1 className="max-w-3xl font-bolota text-3xl md:text-5xl">YOUR ULTIMATE ENTERTAINMENT DESTINATION</h1>

      <Suspense fallback={<p>loading session...</p>}>
        <UserSession />
      </Suspense>
    </div>
  )
}

async function UserSession() {
  const session = await validateSession()
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOutButton />
    </div>
  )
}
