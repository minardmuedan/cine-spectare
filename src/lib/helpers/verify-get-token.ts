import { getTokenDb } from '@/db/utils/token'
import { ZSAError } from 'zsa'

export const verifyAndGetToken = async (tokenId: string) => {
  const token = await getTokenDb(tokenId)
  if (!token) throw new ZSAError('NOT_FOUND', 'Verification token not found!')
  if (token?.updatedAt.getTime() + 30 * 60 * 1000 < Date.now()) throw new ZSAError('NOT_FOUND', 'Verification token is Expired!')

  return token
}
