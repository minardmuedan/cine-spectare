import { H3 } from '@/components/typography'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaCredits from '@/features/media/components/credits'
import { getTvCredits } from '@/lib/tmdb/tv-shows'

export default async function TvCreditsLoadingPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, credits] = await getTvCredits(id)

  if (error)
    return (
      <div>
        <H3 className="mb-4">Credits</H3>
        <ErrorResult error={error} className="h-[132px]" />
      </div>
    )

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
