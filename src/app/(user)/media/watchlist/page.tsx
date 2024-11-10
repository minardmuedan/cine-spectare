import BackgroundMediaImage from '@/components/pages/background-image'
import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import UnauthorizedUi from '@/components/pages/unauthorized'
import { getUserWatchLaterDb } from '@/db/utils/media/watch-later'
import MediaCard from '@/features/media/components/card'
import tryCatchWrapper from '@/lib/helpers/try-catch'
import { validateSession } from '@/lib/session/validate'

export default async function WatchListPage() {
  const { session } = await validateSession()
  if (!session) return <UnauthorizedUi />

  const [error, watchLaterMedia] = await tryCatchWrapper(async () => await getUserWatchLaterDb(session.userId))

  if (error) return <p>{error.message}</p>
  if (!watchLaterMedia.length) return <p>no watchlist</p>
  return (
    <Section>
      <BackgroundMediaImage src={`https://image.tmdb.org/t/p/w500${watchLaterMedia[watchLaterMedia.length - 1].media.backdropPath}`} />
      <PageHeader title="Your Watchlist" description="Your list of must-watch movies and shows, ready when you are" />

      <ul className="grid grid-cols-5 gap-3">
        {watchLaterMedia.toReversed().map(({ media }) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </ul>
    </Section>
  )
}
