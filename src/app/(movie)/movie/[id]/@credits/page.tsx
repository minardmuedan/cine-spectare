import MediaCredits from '@/features/media/components/credits'
import { getMovieCredits } from '@/lib/tmdb/movies'

export default async function MovieCredits(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, credits] = await getMovieCredits(id)

  if (error) return <p>{error.message}</p>

  return <MediaCredits casts={credits.cast} />
}
