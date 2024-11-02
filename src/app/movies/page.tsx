import MediaMutationsDropdown from '@/features/media/dropdown'
import { getMovies } from '@/lib/tmdb/movies'

export default async function PopularMovies() {
  const [error, movies] = await getMovies()
  if (error) return <p>{error.message}</p>

  return (
    <ul className="grid grid-cols-5 gap-3 p-5">
      {movies.results.map(movie => (
        <li key={movie.id} className="rounded border bg-accent/30 p-2">
          <div className="aspect-[1/1.5] bg-accent">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="object-fill" />
          </div>

          <div className="mt-1 flex items-center justify-between">
            <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">{movie.title}</p>

            <MediaMutationsDropdown
              media={{
                id: movie.id,
                title: movie.poster_path,
                posterPath: movie.title,
                voteAverage: movie.vote_average,
                releaseDate: movie.release_date,
                type: 'movie',
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
