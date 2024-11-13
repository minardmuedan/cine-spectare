import BackgroundMediaImage from '@/components/pages/background-image'
import TmdbImage from '@/components/tmdb-image'
import ErrorResult from '@/components/ui/error-result'
import { MediaGenres } from '@/features/media/components/genres-keywords'
import ToggleAlreadyWatchedMutationButton from '@/features/media/toggle-mutations/already-watched/toggle-already-watched-mutation'
import ToggleLikeMutationButton from '@/features/media/toggle-mutations/likes/toggle-like-mutation'
import ToggleWatchLaterMutationButton from '@/features/media/toggle-mutations/watch-later/toggle-watch-later-mutation'
import { getTvDetails } from '@/lib/tmdb/tv-shows'
import { Building2Icon, CalendarFoldIcon, HourglassIcon } from 'lucide-react'

export default async function TvDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const [error, tv] = await getTvDetails(id)
  if (error) return <ErrorResult error={error} className="h-96" />

  const media = {
    id: tv.id,
    title: tv.name,
    posterPath: tv.poster_path,
    backdropPath: tv.backdrop_path,
    releaseDate: tv.first_air_date,
    voteAverage: tv.vote_average,
    type: 'tv' as const,
  }

  return (
    <>
      <BackgroundMediaImage src={tv.backdrop_path} />

      <div className="mx-auto aspect-[1/1.5] w-full max-w-72 overflow-hidden rounded md:mx-0">
        <TmdbImage src={tv.poster_path} alt={`${tv.name} poster`} className="object-cover" />
      </div>

      <div className="flex-1">
        {tv.tagline && <p className="text-xs text-muted-foreground">{tv.tagline}</p>}
        <h1 className="mb-2 max-w-[700px] text-2xl font-medium">{tv.name}</h1>
        <p className="max-w-[700px] text-sm text-muted-foreground">{tv.overview}</p>

        <div className="mt-10 flex flex-wrap gap-2 *:w-full md:*:w-fit">
          <ToggleLikeMutationButton media={media} />
          <ToggleWatchLaterMutationButton media={media} />
          <ToggleAlreadyWatchedMutationButton media={media} />
        </div>

        <ul className="my-10 flex max-w-[700px] flex-col gap-4 text-sm *:flex *:gap-3">
          {tv.first_air_date && (
            <li>
              <CalendarFoldIcon size={16} />
              <p className="flex-1">{tv.first_air_date}</p>
            </li>
          )}
          {tv.episode_run_time && (
            <li>
              <HourglassIcon size={16} />
              <p className="flex-1">{tv.episode_run_time} minutes</p>
            </li>
          )}
          {tv.production_companies?.length && (
            <li>
              <Building2Icon size={16} />

              <p className="flex-1">{tv.production_companies.map(({ name }, i) => `${name}${i != tv.production_companies.length - 1 && ', '}`)}</p>
            </li>
          )}
        </ul>

        <MediaGenres genres={tv.genres} />
      </div>
    </>
  )
}
