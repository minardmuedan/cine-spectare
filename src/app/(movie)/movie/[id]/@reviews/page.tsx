import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getMovieReviews } from '@/lib/tmdb/movies'

export default async function MovieReviews(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, reviews] = await getMovieReviews(id)

  if (error) return <p>{error.message}</p>
  return (
    <div className="max-w-[700px]">
      <h3 className="mb-5 text-xl font-medium text-muted-foreground">
        Reviews <span className="text-sm">{reviews.results.length}</span>
      </h3>

      <ul className="flex flex-col gap-2">
        {reviews.results.slice(0, 2).map(review => (
          <li key={review.id} className="rounded border p-5">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={review.author_details.avatar_path} />
                <AvatarFallback>{review.author_details.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="text-sm">{review.author_details.name}</p>
              <p className="text-xs text-muted-foreground">{new Date(review.updated_at).toLocaleString()}</p>
            </div>

            <p className="mt-5 line-clamp-4 text-sm">{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
