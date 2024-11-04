'use server'

import { getCredentialsUserDb, updateUserPasswordDb } from '@/db/utils/users'
import { changePasswordSchema } from '@/features/authentication/schema'
import { authedProcedure } from '@/lib/helpers/authed-procedure'
import { Argon2id } from 'oslo/password'

export const changePasswordAction = authedProcedure
  .input(changePasswordSchema)
  .handler(async ({ input: { currentPassword, newPassword }, ctx: { userId } }) => {
    const user = await getCredentialsUserDb(userId)
    if (!user || !user.hashedPassword) throw 'User was not found! Please try again'

    const comparePassword = await new Argon2id().verify(user.hashedPassword, currentPassword)

    if (!comparePassword) throw 'Wrong credentials! Please try again'

    const hashedPassword = await new Argon2id().hash(newPassword)
    await updateUserPasswordDb(userId, hashedPassword)
  })
