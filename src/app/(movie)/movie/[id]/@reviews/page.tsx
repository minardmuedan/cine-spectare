import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getMovieReviews } from '@/lib/tmdb/movies'
import { H3 } from '@/components/typography'
import NoResult from '@/components/ui/no-results'
import MediaReviewsDialog from '@/features/media/components/reviews'
import ErrorResult from '@/components/ui/error-result'

export default async function MovieReviewsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, reviews] = await getMovieReviews(id)

  if (error)
    return (
      <div className="max-w-[700px]">
        <H3 className="mb-4">Reviews</H3>

        <ErrorResult error={error} className="h-60" />
      </div>
    )

  return (
    <div className="max-w-[700px]">
      <H3 className="mb-4">
        Reviews <span className="text-sm">{reviews.total_results}</span>
      </H3>

      {reviews.total_results ? (
        <ul className="flex flex-col gap-2">
          {reviews.results.slice(0, 2).map(review => (
            <li key={review.id} className="rounded border bg-accent-muted p-5">
              <div className="mb-5 flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={review.author_details.avatar_path} />
                  <AvatarFallback>{review.author_details.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{review.author_details.name}</p>
                <p className="text-xs text-muted-foreground">{new Date(review.updated_at).toLocaleString()}</p>
              </div>

              <p className="line-clamp-4 text-sm" dangerouslySetInnerHTML={{ __html: review.content }} />
            </li>
          ))}

          <li className="flex justify-end">
            <MediaReviewsDialog initialReviews={reviews} type="movie" />
          </li>
        </ul>
      ) : (
        <NoResult className="h-60" />
      )}
    </div>
  )
}
