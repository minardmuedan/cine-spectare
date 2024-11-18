import { H3 } from '@/components/typography'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaCredits from '@/features/media/components/credits'
import { getMovieCredits } from '@/lib/tmdb/movies'

export default async function MovieCreditsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, credits] = await getMovieCredits(id)

  if (error)
    return (
      <>
        <H3 className="mb-4">Credits</H3>
        <ErrorResult error={error} className="h-[132px]" />
      </>
    )

  if (!credits.cast.length)
    return (
      <>
        <H3 className="mb-4">
          Credits <span className="text-sm">0</span>
        </H3>
        <NoResult className="h-[132px]" />
      </>
    )

  const casts = credits.cast.map(cast => ({ ...cast, roles: [cast.character] }))
  const crews = credits.crew.map(crew => ({ ...crew, roles: [crew.job] }))

  return <MediaCredits credits={{ casts, crews }} />
}
