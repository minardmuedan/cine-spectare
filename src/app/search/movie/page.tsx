import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaList from '@/features/media/components/list'
import { getSearchMovies } from '@/lib/tmdb/search'

export default async function SearchMoviePage({ searchParams }: { searchParams: Promise<{ query: string; page: string }> }) {
  const { query } = await searchParams

  const [error, movies] = await getSearchMovies(query)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-340px)]" />

  if (!movies.results?.length) return <NoResult className="min-h-[calc(100dvh-340px)]" />

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
