import { getUserAlreadyWatchedIdDb } from '@/db/utils/media/already-watched'
import { validateSession } from '@/lib/session/validate'

export async function GET() {
  const { session } = await validateSession()
  if (!session) return Response.json('Unauthorized Access! Please Login', { status: 401 })

  const userAlreadyWatchedMedias = await getUserAlreadyWatchedIdDb(session.userId)

  return Response.json(userAlreadyWatchedMedias.map(media => ({ ...media, mediaId: Number(media.mediaId) })))
}
