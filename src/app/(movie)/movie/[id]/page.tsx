import BackgroundMediaImage from '@/components/pages/background-image'
import { getMovieDetails } from '@/lib/tmdb/movies'
import { MovieDetailsSectionsSideNav, MovieSection } from './_components'
import { MediaGenres } from '@/features/media/components'
import { Building2Icon, CalendarFoldIcon, HourglassIcon } from 'lucide-react'
import ToggleLikeMutationButton from '@/features/media/likes/components/toggle-like-mutation'
import ToggleWatchLaterMutationButton from '@/features/media/watch-later/components/toggle-watch-later-mutation'
import ToggleAlreadyWatchedMutationButton from '@/features/media/already-watched/components/toggle-already-watched-mutation'
import Back from '@/components/back-button'

export default async function MovieDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, movie] = await getMovieDetails(id)
  if (error) return <p>{error.message}</p>

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
    <div className="relative">
      <Back className="mb-[30dvh] ml-2 mt-2" />

      <BackgroundMediaImage src={movie.backdrop_path} />

      <div className="flex gap-5 p-2 md:p-5">
        <MovieDetailsSectionsSideNav />

        <div className="flex-1">
          <MovieSection section="Details" className="flex flex-col gap-5 pb-20 md:flex-row">
            <div className="mx-auto aspect-[1/1.5] w-full max-w-72 overflow-hidden rounded md:mx-0">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="object-cover" />
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

              <ul className="mt-10 flex max-w-[700px] flex-col gap-4 text-sm *:flex *:gap-3">
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

              <MediaGenres genres={movie.genres} className="mt-10" />
            </div>
          </MovieSection>

          {/* 
          

          
          */}
          <MovieSection section="Credits" className="h-dvh border">
            credits
          </MovieSection>
          <MovieSection section="Reviews & Keywords" className="h-dvh border">
            reviews & keywords
          </MovieSection>
          <MovieSection section="Media" className="h-dvh border">
            media
          </MovieSection>
          <MovieSection section="Similarities" className="h-dvh border">
            similarities
          </MovieSection>
          <MovieSection section="Recommendations" className="h-dvh border">
            recommendations
          </MovieSection>
        </div>
      </div>
    </div>
  )
}
