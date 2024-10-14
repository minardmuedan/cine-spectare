'use server'

import { argonVerify } from '@/lib/auth/helpers/argon'
import { rateLimiter } from '@/lib/auth/rate-limiter'
import { createSession } from '@/lib/auth/session/create-session'
import { getUserByEmailDb } from '@/lib/db/utils/user'
import { signInInputSchema } from '@/lib/schema/auth'
import { getIpAddress } from '@/lib/auth/helpers/headers'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'

export const signInAction = createServerAction()
  .input(signInInputSchema)
  .handler(async ({ input: { email, password } }) => {
    const limit = rateLimiter(`signin-${getIpAddress() || email}`, 12, 180)
    if (limit.isExceed) return limit

    const user = await getUserByEmailDb(email).catch(() => {
      throw 'Something went wrong getting the user'
    })
    if (!user || !user.hashedPassword) throw 'No matching user found'

    const comparePassword = await argonVerify(user.hashedPassword, password)
    if (!comparePassword) throw 'Incorrect email or password'

    await createSession(user.id)
    redirect('/')
  })
