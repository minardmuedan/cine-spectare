'use server'

import { invalidateSession } from '@/lib/session/invalidate'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'

export const logoutAction = createServerAction().handler(async () => {
  await invalidateSession()
  redirect('/login')
})
