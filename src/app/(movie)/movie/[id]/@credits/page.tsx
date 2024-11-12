import { H3 } from '@/components/typography'
import NoResult from '@/components/ui/no-results'
import MediaCredits from '@/features/media/components/credits'
import { getMovieCredits } from '@/lib/tmdb/movies'

export default async function MovieCreditsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, credits] = await getMovieCredits(id)

  if (error) return <p>{error.message}</p>

  if (!credits.cast.length)
    return (
      <div>
        <H3 className="mb-4">
          Credits <span className="text-sm">0</span>
        </H3>
        <NoResult className="h-[132px]" />
      </div>
    )

  return <MediaCredits casts={credits.cast} />
}
