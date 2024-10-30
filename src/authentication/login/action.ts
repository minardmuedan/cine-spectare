'use server'

import { createServerAction } from 'zsa'
import { loginSchema } from '../schema'
import { rateLimiter } from '@/lib/rate-limiter'
import { getIpAddress } from '@/lib/helpers/headers'
import { getCredentialsUserByEmailDb } from '@/db/utils/users'
import { Argon2id } from 'oslo/password'
import { createSession } from '@/lib/session/create'
import { redirect } from 'next/navigation'

export const loginAction = createServerAction()
  .input(loginSchema)
  .handler(async ({ input: { email, password } }) => {
    const limit = rateLimiter(`login-${(await getIpAddress()) || email}`, 12, 180)
    if (limit.isExceed) return limit

    const user = await getCredentialsUserByEmailDb(email)
    if (!user || !user.hashedPassword) throw 'No matching user found'

    const comparePassword = await new Argon2id().verify(user.hashedPassword, password)
    if (!comparePassword) throw 'Incorrect email or password'

    await createSession(user.id)
    redirect('/')
  })
