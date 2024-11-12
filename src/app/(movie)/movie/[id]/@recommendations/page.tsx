import NoResult from '@/components/ui/no-results'
import MediaList from '@/features/media/components/list'
import { getMovieRecommendations } from '@/lib/tmdb/movies'

export default async function MovieRecommendationsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, movies] = await getMovieRecommendations(id)

  if (error) return <p>{error.message}</p>
  if (!movies.results.length) return <NoResult className="h-64" />

  return (
    <MediaList
      medias={movies.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        voteAverage: movie.vote_average,
        releaseDate: movie.release_date,
        type: 'movie',
      }))}
    />
  )
}
