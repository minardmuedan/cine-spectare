import BackgroundMediaImage from '@/components/pages/background-image'
import TmdbImage from '@/components/tmdb-image'
import ToggleAlreadyWatchedMutationButton from '@/features/media/toggle-mutations/already-watched/toggle-already-watched-mutation'
import { MediaGenres } from '@/features/media/components/genres-keywords'
import ToggleLikeMutationButton from '@/features/media/toggle-mutations/likes/toggle-like-mutation'
import ToggleWatchLaterMutationButton from '@/features/media/toggle-mutations/watch-later/toggle-watch-later-mutation'
import { getMovieDetails } from '@/lib/tmdb/movies'
import { Building2Icon, CalendarFoldIcon, HourglassIcon } from 'lucide-react'
import ErrorResult from '@/components/ui/error-result'
import { serializeMedia } from '@/features/media/helpers/transform'

export default async function MovieDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, rawMovie] = await getMovieDetails(id)

  if (error) return <ErrorResult error={error} className="h-96" />
  const movie = serializeMedia({ ...rawMovie, type: 'movie' })

  return (
    <>
      <BackgroundMediaImage src={movie.backdropPath} />

      <div className="mx-auto aspect-[1/1.5] w-full max-w-72 overflow-hidden rounded md:mx-0">
        <TmdbImage src={movie.posterPath} alt={`${movie.title} poster`} className="object-cover" />
      </div>

      <div className="flex-1">
        {rawMovie.tagline && <p className="text-xs text-muted-foreground">{rawMovie.tagline}</p>}
        <h1 className="mb-2 max-w-[700px] text-2xl font-medium">{movie.title}</h1>
        <p className="max-w-[700px] text-sm text-muted-foreground">{rawMovie.overview}</p>

        <div className="mt-10 flex flex-wrap gap-2 *:w-full md:*:w-fit">
          <ToggleLikeMutationButton media={movie} />
          <ToggleWatchLaterMutationButton media={movie} />
          <ToggleAlreadyWatchedMutationButton media={movie} />
        </div>

        <ul className="my-10 flex max-w-[700px] flex-col gap-4 text-sm *:flex *:gap-3">
          {movie.releaseDate && (
            <li>
              <CalendarFoldIcon size={16} />
              <p className="flex-1">{movie.releaseDate}</p>
            </li>
          )}
          {rawMovie.runtime && (
            <li>
              <HourglassIcon size={16} />
              <p className="flex-1">{rawMovie.runtime} minutes</p>
            </li>
          )}
          {rawMovie.production_companies?.length && (
            <li>
              <Building2Icon size={16} />

              <p className="flex-1">{rawMovie.production_companies.map(company => company.name).join(', ')}</p>
            </li>
          )}
        </ul>

        <MediaGenres genres={rawMovie.genres} />
      </div>
    </>
  )
}
