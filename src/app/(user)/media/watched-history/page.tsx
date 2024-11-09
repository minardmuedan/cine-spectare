import BackgroundMediaImage from '@/components/pages/background-image'
import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import UnauthorizedUi from '@/components/pages/unauthorized'
import { getUserAlreadyWatchedDb } from '@/db/utils/media/already-watched'
import MediaCard from '@/features/media/components/media-card'
import tryCatchWrapper from '@/lib/helpers/try-catch'
import { validateSession } from '@/lib/session/validate'

export default async function WatchedHistoryPage() {
  const { session } = await validateSession()
  if (!session) return <UnauthorizedUi />

  const [error, alreadyWatchedMedia] = await tryCatchWrapper(async () => await getUserAlreadyWatchedDb(session.userId))

  if (error) return <p>{error.message}</p>
  if (!alreadyWatchedMedia.length) return <p>no watched history</p>
  return (
    <Section>
      <BackgroundMediaImage src={alreadyWatchedMedia[alreadyWatchedMedia.length - 1].media.backdropPath} />
      <PageHeader title="Your Watched History" description="A history of movies and shows you’ve completed watching." />

      <ul className="grid grid-cols-5 gap-3">
        {alreadyWatchedMedia.toReversed().map(({ media }) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </ul>
    </Section>
  )
}
