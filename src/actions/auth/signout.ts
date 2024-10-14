'use server'

import { invalidateSession } from '@/lib/auth/session/invalidate-session'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'

export const signOutAction = createServerAction().handler(async () => {
  await invalidateSession()
  redirect('/signin')
})
