import { getUserLikesDb } from '@/db/utils/media/likes'
import { validateSession } from '@/lib/session/validate'

export async function GET() {
  await new Promise(res => setTimeout(res, 5000))

  const { session } = await validateSession()
  if (!session) return Response.json('Unauthorized Access! Please Login', { status: 401 })

  const userLikes = await getUserLikesDb(session.userId)

  return Response.json(userLikes.map(like => ({ ...like, mediaId: Number(like.mediaId) })))
}
