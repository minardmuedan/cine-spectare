import BackgroundMediaImage from '@/components/pages/background-image'
import UnauthorizedUi from '@/components/pages/unauthorized'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { getUserWatchLaterDb } from '@/db/utils/media/watch-later'
import MediaList from '@/features/media/components/list'
import tryCatchWrapper from '@/lib/helpers/try-catch'
import { validateSession } from '@/lib/session/validate'

export default async function WatchListPage() {
  const { session } = await validateSession()
  if (!session) return <UnauthorizedUi className="min-h-[calc(100dvh-15rem)]" />

  const [error, watchLaterMedia] = await tryCatchWrapper(async () => await getUserWatchLaterDb(session.userId))
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-15rem)]" />
  if (!watchLaterMedia.length) return <NoResult className="min-h-[calc(100dvh-15rem)]" />

  return (
    <>
      <BackgroundMediaImage src={watchLaterMedia[watchLaterMedia.length - 1].media.backdropPath} />

      <MediaList
        medias={watchLaterMedia.map(({ media }) => ({
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
