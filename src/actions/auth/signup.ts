'use server'

import { argonHash } from '@/lib/auth/helpers/argon'
import { generateCode, generateId } from '@/lib/auth/helpers/generate'
import { createUserDb } from '@/lib/db/utils/user'
import { createVerificationDb, deleteVerificationByPayloadDb, deleteVerificationDb, getVerificationDb } from '@/lib/db/utils/verifications'
import { createAccontInputSchema, emailSchema } from '@/lib/schema/auth'
import { createServerAction, ZSAError } from 'zsa'

export const signUpAction = createServerAction()
  .input(emailSchema)
  .handler(async ({ input: { email } }) => {
    const id = generateId(20)
    const code = generateCode()

    await deleteVerificationByPayloadDb(email).catch(() => {})
    await createVerificationDb({ id, emailPayload: email, code, purpose: 'email-verification' })

    // TODO: send code to email
    console.log(email, ' : ', code)

    return { id }
  })

export const createPasswordAction = createServerAction()
  .input(createAccontInputSchema)
  .handler(async ({ input: { tokenId, password } }) => {
    const verification = await getVerificationDb(tokenId)

    if (!verification) throw new ZSAError('NOT_FOUND', 'Verification token not found!')
    if (verification.purpose !== 'create-password') throw new ZSAError('NOT_FOUND', 'Email is not yet verified!')
    if (verification?.updatedAt.getTime() + 30 * 60 * 1000 < Date.now()) throw new ZSAError('NOT_FOUND', 'Verification token is Expired!')

    const id = generateId(10)
    const hashedPassword = await argonHash(password)

    await deleteVerificationDb(tokenId).catch(() => {})
    await createUserDb({ id, email: verification.emailPayload, hashedPassword, provider: 'credentials' })

    //create a session
  })
