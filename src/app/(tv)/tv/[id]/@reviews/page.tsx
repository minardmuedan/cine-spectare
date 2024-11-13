import { H3 } from '@/components/typography'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaReviews from '@/features/media/components/reviews'
import { getTvReviews } from '@/lib/tmdb/tv-shows'

export default async function TvReviewsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, reviews] = await getTvReviews(id)

  if (error)
    return (
      <div className="max-w-[700px]">
        <H3 className="mb-4">Reviews</H3>

        <ErrorResult error={error} className="h-60" />
      </div>
    )

  if (!reviews.total_results)
    return (
      <div className="max-w-[700px]">
        <H3 className="mb-4">Reviews {reviews.total_results}</H3>
        <NoResult className="h-60" />
      </div>
    )

  return <MediaReviews initialReviews={reviews} type="tv" />
}
