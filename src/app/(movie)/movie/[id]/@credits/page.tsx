import MediaCredits from '@/features/media/components/media-credits'
import { getMovieCredits } from '@/lib/tmdb/movies'

export default async function MovieCredits(props: { params: Promise<{ id: string }> }) {
  await new Promise(res => setTimeout(res, 5000))

  const { id } = await props.params
  const [error, credits] = await getMovieCredits(id)

  if (error) return <p>{error.message}</p>

  return (
    <>
      <MediaCredits casts={credits.cast} />
    </>
  )
}
