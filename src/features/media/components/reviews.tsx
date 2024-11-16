import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { H3 } from '@/components/typography'
import { TReviews } from '@/lib/tmdb/_movie-type'
import MediaReviewsDialog from './reviews-dialog'
import { timeAgo } from '@/lib/helpers/format-date'

export default function MediaReviews({ initialReviews, type }: { initialReviews: TReviews; type: 'movie' | 'tv' }) {
  return (
    <div className="max-w-[700px]">
      <H3 className="mb-4">
        Reviews <span className="text-sm">{initialReviews.total_results}</span>
      </H3>

      <ul className="flex flex-col gap-2">
        {initialReviews.results.slice(0, 2).map(review => (
          <li key={review.id} className="rounded border bg-accent-muted p-5">
            <div className="mb-5 flex items-center gap-2">
              <Avatar>
                <AvatarImage src={review.author_details.avatar_path} />
                <AvatarFallback>{review.author_details.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="text-sm">{review.author_details.name}</p>
              <p className="text-xs text-muted-foreground">{timeAgo(new Date(review.updated_at))}</p>
            </div>

            <p className="line-clamp-4 text-sm" dangerouslySetInnerHTML={{ __html: review.content }} />
          </li>
        ))}
      </ul>

      <div className="mt-2 flex justify-end">
        <MediaReviewsDialog initialReviews={initialReviews} type={type} />
      </div>
    </div>
  )
}
