import BackgroundMediaImage from '@/components/pages/background-image'
import TmdbImage from '@/components/tmdb-image'
import ErrorResult from '@/components/ui/error-result'
import { MediaGenres } from '@/features/media/components/genres-keywords'
import { serializeMedia } from '@/features/media/helpers/transform'
import ToggleAlreadyWatchedMutationButton from '@/features/media/toggle-mutations/already-watched/toggle-already-watched-mutation'
import ToggleLikeMutationButton from '@/features/media/toggle-mutations/likes/toggle-like-mutation'
import ToggleWatchLaterMutationButton from '@/features/media/toggle-mutations/watch-later/toggle-watch-later-mutation'
import { getTvDetails } from '@/lib/tmdb/tv-shows'
import { Building2Icon, CalendarFoldIcon, HourglassIcon } from 'lucide-react'

export default async function TvDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, rawTv] = await getTvDetails(id)

  if (error) return <ErrorResult error={error} className="h-96" />
  const tv = serializeMedia({ ...rawTv, type: 'tv' })

  return (
    <>
      <BackgroundMediaImage src={tv.backdropPath} />

      <div className="relative mx-auto aspect-[1/1.5] w-full max-w-72 overflow-hidden rounded md:mx-0">
        <TmdbImage src={tv.posterPath} alt={`${tv.title} poster`} fill sizes="284px" className="object-cover" />
      </div>

      <div className="flex-1">
        {rawTv.tagline && <p className="text-xs text-muted-foreground">{rawTv.tagline}</p>}
        <h1 className="mb-2 max-w-[700px] text-2xl font-medium">{tv.title}</h1>
        <p className="max-w-[700px] text-sm text-muted-foreground">{rawTv.overview}</p>

        <div className="mt-10 flex flex-wrap gap-2 *:w-full md:*:w-fit">
          <ToggleLikeMutationButton media={tv} />
          <ToggleWatchLaterMutationButton media={tv} />
          <ToggleAlreadyWatchedMutationButton media={tv} />
        </div>

        <ul className="my-10 flex max-w-[700px] flex-col gap-4 text-sm *:flex *:gap-3">
          {tv.releaseDate && (
            <li>
              <CalendarFoldIcon size={16} />
              <p className="flex-1">{tv.releaseDate}</p>
            </li>
          )}
          {rawTv.episode_run_time && (
            <li>
              <HourglassIcon size={16} />
              <p className="flex-1">{rawTv.episode_run_time} minutes</p>
            </li>
          )}
          {rawTv.production_companies?.length && (
            <li>
              <Building2Icon size={16} />

              <p className="flex-1">{rawTv.production_companies.map(company => company.name).join(', ')}</p>
            </li>
          )}
        </ul>

        <MediaGenres genres={rawTv.genres} />
      </div>
    </>
  )
}
