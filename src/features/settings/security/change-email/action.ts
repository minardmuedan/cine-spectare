import { authedProcedure } from '@/lib/helpers/authed-procedure'
import { codeSchema, tokenIdSchema } from '@/lib/schema'

// export const createChangeEmailTokenAction = authedProcedure.

export const changeEmailAction = authedProcedure.input(tokenIdSchema.and(codeSchema)).handler(async () => {
  console.log('hello')
})
