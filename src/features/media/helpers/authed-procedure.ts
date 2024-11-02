import { validateSession } from '@/lib/session/validate'
import { createServerActionProcedure, ZSAError } from 'zsa'

export const authedProcedure = createServerActionProcedure()
  .handler(async () => {
    const { session } = await validateSession()
    if (!session) throw new ZSAError('NOT_AUTHORIZED', 'Unauthorized Access! Please Login')
    return { userId: session.userId }
  })
  .createServerAction()
