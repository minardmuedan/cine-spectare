import BackgroundMediaImage from '@/components/pages/background-image'
import TmdbImage from '@/components/tmdb-image'
import ToggleAlreadyWatchedMutationButton from '@/features/media/toggle-mutations/already-watched/toggle-already-watched-mutation'
import { MediaGenres } from '@/features/media/components/genres-keywords'
import ToggleLikeMutationButton from '@/features/media/toggle-mutations/likes/toggle-like-mutation'
import ToggleWatchLaterMutationButton from '@/features/media/toggle-mutations/watch-later/toggle-watch-later-mutation'
import { getMovieDetails } from '@/lib/tmdb/movies'
import { Building2Icon, CalendarFoldIcon, HourglassIcon } from 'lucide-react'
import ErrorResult from '@/components/ui/error-result'

export default async function MovieDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, movie] = await getMovieDetails(id)

  if (error) return <ErrorResult error={error} className="h-96" />

  const media = {
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    type: 'movie' as const,
  }

  return (
    <>
      <BackgroundMediaImage src={movie.backdrop_path} />

      <div className="mx-auto aspect-[1/1.5] w-full max-w-72 overflow-hidden rounded md:mx-0">
        <TmdbImage src={movie.poster_path} alt={`${movie.title} poster`} className="object-cover" />
      </div>

      <div className="flex-1">
        {movie.tagline && <p className="text-xs text-muted-foreground">{movie.tagline}</p>}
        <h1 className="mb-2 max-w-[700px] text-2xl font-medium">{movie.title}</h1>
        <p className="max-w-[700px] text-sm text-muted-foreground">{movie.overview}</p>

        <div className="mt-10 flex flex-wrap gap-2 *:w-full md:*:w-fit">
          <ToggleLikeMutationButton media={media} />
          <ToggleWatchLaterMutationButton media={media} />
          <ToggleAlreadyWatchedMutationButton media={media} />
        </div>

        <ul className="my-10 flex max-w-[700px] flex-col gap-4 text-sm *:flex *:gap-3">
          {movie.release_date && (
            <li>
              <CalendarFoldIcon size={16} />
              <p className="flex-1">{movie.release_date}</p>
            </li>
          )}
          {movie.runtime && (
            <li>
              <HourglassIcon size={16} />
              <p className="flex-1">{movie.runtime} minutes</p>
            </li>
          )}
          {movie.production_companies?.length && (
            <li>
              <Building2Icon size={16} />

              <p className="flex-1">
                {movie.production_companies.map(({ name }, i) => `${name}${i != movie.production_companies.length - 1 && ', '}`)}
              </p>
            </li>
          )}
        </ul>

        <MediaGenres genres={movie.genres} />
      </div>
    </>
  )
}
