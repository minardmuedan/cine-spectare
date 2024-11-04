import BackgroundMediaImage from '@/components/pages/background-image'
import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import UnauthorizedUi from '@/components/pages/unauthorized'
import { getUserLikesDb } from '@/db/utils/media/likes'
import IndividualMedia from '@/features/media/components/individual'
import tryCatchWrapper from '@/lib/helpers/try-catch'
import { validateSession } from '@/lib/session/validate'

export default async function LikesMediaPage() {
  const { session } = await validateSession()
  if (!session) return <UnauthorizedUi />

  const [error, likes] = await tryCatchWrapper(async () => await getUserLikesDb(session.userId))

  if (error) return <p>{error.message}</p>
  if (!likes.length) return <p>no likes</p>
  return (
    <Section>
      <BackgroundMediaImage src={`https://image.tmdb.org/t/p/w500${likes[likes.length - 1].media.backdropPath}`} />
      <PageHeader title="Your Likes" description="Movies and shows you've liked. Revisit your favorites anytime" />

      <ul className="grid grid-cols-5 gap-3">
        {likes.toReversed().map(({ media }) => (
          <IndividualMedia key={media.id} {...media} />
        ))}
      </ul>
    </Section>
  )
}
