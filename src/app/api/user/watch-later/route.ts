import { getUserWatchLaterIdDb } from '@/db/utils/media/watch-later'
import { validateSession } from '@/lib/session/validate'

export async function GET() {
  const { session } = await validateSession()
  if (!session) return Response.json('Unauthorized Access! Please Login', { status: 401 })

  const userWatchLaterMedias = await getUserWatchLaterIdDb(session.userId)

  return Response.json(userWatchLaterMedias.map(media => ({ ...media, mediaId: Number(media.mediaId) })))
}
