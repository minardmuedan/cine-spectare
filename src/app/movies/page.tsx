import IndividualMedia from '@/features/media/components/individual'
import { getMovies } from '@/lib/tmdb/movies'

export default async function PopularMovies() {
  const [error, movies] = await getMovies()
  if (error) return <p>{error.message}</p>

  return (
    <ul className="grid grid-cols-5 gap-3 p-5">
      {movies.results.map(movie => (
        <IndividualMedia
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          backdropPath={movie.backdrop_path}
          voteAverage={movie.vote_average}
          releaseDate={movie.release_date}
          type="movie"
        />
      ))}
    </ul>
  )
}
