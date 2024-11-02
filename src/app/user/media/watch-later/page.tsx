import BackgroundMediaImage from '@/components/pages/background-image'
import PageHeader from '@/components/pages/header'
import UnauthorizedUi from '@/components/pages/unauthorized'
import { getUserWatchLaterDb } from '@/db/utils/media/watch-later'
import IndividualMedia from '@/features/media/components/individual'
import tryCatchWrapper from '@/lib/helpers/try-catch'
import { validateSession } from '@/lib/session/validate'

export default async function WatchLaterMediaPage() {
  const { session } = await validateSession()
  if (!session) return <UnauthorizedUi />

  const [error, watchLaterMedia] = await tryCatchWrapper(async () => await getUserWatchLaterDb(session.userId))

  if (error) return <p>{error.message}</p>
  if (!watchLaterMedia.length) return <p>no watch later</p>
  return (
    <section className="relative">
      <BackgroundMediaImage src={`https://image.tmdb.org/t/p/w500${watchLaterMedia[watchLaterMedia.length - 1].media.backdropPath}`} />
      <PageHeader title="Your Watch Later" description="Your list of must-watch movies and shows, ready when you are" />

      <ul className="grid grid-cols-5 gap-3">
        {watchLaterMedia.toReversed().map(({ media }) => (
          <IndividualMedia key={media.id} {...media} />
        ))}
      </ul>
    </section>
  )
}
