'use server'

import { argonHash } from '@/lib/auth/helpers/argon'
import { generateCode, generateId } from '@/lib/auth/helpers/generate'
import { createSession } from '@/lib/auth/session/create-session'
import { createUserDb, getUserByEmailDb } from '@/lib/db/utils/user'
import { createVerificationDb, deleteVerificationByPayloadDb, deleteVerificationDb, getVerificationDb } from '@/lib/db/utils/verifications'
import { createAccountInputSchema, emailSchema } from '@/lib/schema/auth'
import { redirect } from 'next/navigation'
import { createServerAction, ZSAError } from 'zsa'

export const signUpAction = createServerAction()
  .input(emailSchema)
  .handler(async ({ input: { email } }) => {
    const existingUser = await getUserByEmailDb(email)
    if (!!existingUser) throw 'Email already in use'

    const id = generateId(20)
    const code = generateCode()

    await deleteVerificationByPayloadDb(email).catch(() => {})
    await createVerificationDb({ id, emailPayload: email, code, purpose: 'email-verification' })

    // TODO: send code to email
    console.log(email, ' : ', code)

    return { id }
  })

export const createPasswordAction = createServerAction()
  .input(createAccountInputSchema)
  .handler(async ({ input: { tokenId, password } }) => {
    const verification = await getVerificationDb(tokenId)

    if (!verification) throw new ZSAError('NOT_FOUND', 'Verification token not found!')
    if (verification.purpose !== 'create-password') throw new ZSAError('NOT_FOUND', 'Email is not yet verified!')
    if (verification?.updatedAt.getTime() + 30 * 60 * 1000 < Date.now()) throw new ZSAError('NOT_FOUND', 'Verification token is Expired!')

    const id = generateId(10)
    const hashedPassword = await argonHash(password)

    await deleteVerificationDb(tokenId).catch(() => {})
    await createUserDb({ id, email: verification.emailPayload, hashedPassword, provider: 'credentials' })

    await createSession(id)
    redirect('/')
  })
