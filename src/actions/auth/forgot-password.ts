'use server'

import { generateCode, generateId } from '@/lib/auth/helpers/generate'
import { rateLimiter } from '@/lib/auth/rate-limiter'
import { getUserByEmailDb } from '@/lib/db/utils/user'
import { createVerificationDb } from '@/lib/db/utils/verifications'
import { emailSchema } from '@/lib/schema/auth'
import { getIpAddress } from '@/lib/utils/headers'
import { createServerAction } from 'zsa'

export const forgotPasswordAction = createServerAction()
  .input(emailSchema)
  .handler(async ({ input: { email } }) => {
    await new Promise((res) => setTimeout(res, 5000))
    const limiter = rateLimiter(`forgot-password-${getIpAddress() || email}`, 12, 200)
    if (limiter.isExceed) return limiter

    const user = await getUserByEmailDb(email)
    if (!user || !user.hashedPassword) throw 'No matching user found'

    const id = generateId(20)
    const code = generateCode()

    await createVerificationDb({ id, emailPayload: email, code, purpose: 'change-password-verification' })

    // TODO: send code to email
    console.log(email, ' : ', code)

    return { id }
  })

// export const createPasswordAction = createServerAction()
//   .input(createAccontInputSchema)
//   .handler(async ({ input: { tokenId, password } }) => {
//     const verification = await getVerificationDb(tokenId)

//     if (!verification) throw new ZSAError('NOT_FOUND', 'Verification token not found!')
//     if (verification.purpose !== 'create-password') throw new ZSAError('NOT_FOUND', 'Email is not yet verified!')
//     if (verification?.updatedAt.getTime() + 30 * 60 * 1000 < Date.now()) throw new ZSAError('NOT_FOUND', 'Verification token is Expired!')

//     const id = generateId(10)
//     const hashedPassword = await argonHash(password)

//     await deleteVerificationDb(tokenId).catch(() => {})
//     await createUserDb({ id, email: verification.emailPayload, hashedPassword, provider: 'credentials' })

//     //create a session
//   })
