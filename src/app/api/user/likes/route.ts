import { getUserLikesIdDb } from '@/db/utils/media/likes'
import { validateSession } from '@/lib/session/validate'

export async function GET() {
  const { session } = await validateSession()
  if (!session) return Response.json('Unauthorized Access! Please Login', { status: 401 })

  const userLikes = await getUserLikesIdDb(session.userId)

  return Response.json(userLikes.map(like => ({ ...like, mediaId: Number(like.mediaId) })))
}
