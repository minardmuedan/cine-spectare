import BackgroundMediaImage from '@/components/pages/background-image'
import PageHeader from '@/components/pages/header'
import UnauthorizedUi from '@/components/pages/unauthorized'
import { getUserAlreadyWatchedDb } from '@/db/utils/media/already-watched'
import IndividualMedia from '@/features/media/components/individual'
import tryCatchWrapper from '@/lib/helpers/try-catch'
import { validateSession } from '@/lib/session/validate'

export default async function AlreadyWatchedMediaPage() {
  const { session } = await validateSession()
  if (!session) return <UnauthorizedUi />

  const [error, alreadyWatchedMedia] = await tryCatchWrapper(async () => await getUserAlreadyWatchedDb(session.userId))

  if (error) return <p>{error.message}</p>
  if (!alreadyWatchedMedia.length) return <p>no already watched</p>
  return (
    <section className="relative">
      <BackgroundMediaImage src={`https://image.tmdb.org/t/p/w500${alreadyWatchedMedia[alreadyWatchedMedia.length - 1].media.backdropPath}`} />
      <PageHeader title="Your Already Watched" description="A history of movies and shows you’ve completed watching." />

      <ul className="grid grid-cols-5 gap-3">
        {alreadyWatchedMedia.toReversed().map(({ media }) => (
          <IndividualMedia key={media.id} {...media} />
        ))}
      </ul>
    </section>
  )
}
