import BackgroundMediaImage from '@/components/pages/background-image'
import UnauthorizedUi from '@/components/pages/unauthorized'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { getUserLikesDb } from '@/db/utils/media/likes'
import MediaList from '@/features/media/components/list'
import tryCatchWrapper from '@/lib/helpers/try-catch'
import { validateSession } from '@/lib/session/validate'

export default async function LikesMediaPage() {
  const { session } = await validateSession()
  if (!session) return <UnauthorizedUi className="min-h-[calc(100dvh-15rem)]" />

  const [error, likes] = await tryCatchWrapper(async () => await getUserLikesDb(session.userId))
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-15rem)]" />
  if (!likes.length) return <NoResult className="min-h-[calc(100dvh-15rem)]" />

  return (
    <>
      <BackgroundMediaImage src={likes[likes.length - 1].media.backdropPath} />

      <MediaList
        medias={likes.map(({ media }) => ({
          id: media.id,
          title: media.title,
          posterPath: media.posterPath,
          backdropPath: media.backdropPath,
          voteAverage: media.voteAverage,
          releaseDate: media.releaseDate,
          type: media.type,
        }))}
      />
    </>
  )
}
