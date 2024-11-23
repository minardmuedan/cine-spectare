import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getMovieRecommendations } from '@/lib/tmdb/movies'

export default async function MovieRecommendationsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, movies] = await getMovieRecommendations(id)

  if (error) return <ErrorResult error={error} className="h-64" />
  if (!movies.results.length) return <NoResult className="h-64" />

  return <MediaList medias={movies.results.map(movie => serializeMedia({ ...movie, type: 'movie' }))} />
}
