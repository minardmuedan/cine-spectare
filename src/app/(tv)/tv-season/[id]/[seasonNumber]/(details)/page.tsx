import TmdbImage from '@/components/tmdb-image'
import { H3 } from '@/components/typography'
import ErrorResult from '@/components/ui/error-result'
import TvEpisodes from '@/features/media/components/tv-episodes'
import { getTvSeason } from '@/lib/tmdb/tv-shows'

export default async function TvSeasonDetailsPage(props: { params: Promise<{ id: string; seasonNumber: string }> }) {
  const { id, seasonNumber } = await props.params
  const [error, season] = await getTvSeason(id, seasonNumber)

  if (error) return <ErrorResult error={error} />

  return (
    <>
      <section className="flex flex-col items-center gap-5 pt-20 text-center">
        <div className="relative aspect-[1/1.5] w-full max-w-72 overflow-hidden rounded">
          <TmdbImage src={season.poster_path} alt={`${season.name} poster`} fill sizes="284px" className="object-cover" />
        </div>

        <div className="max-w-[700px]">
          <p className="text-xs text-muted-foreground">Season {season.season_number}</p>
          <h1 className="mb-2 text-2xl font-medium">{season.name}</h1>
          <p className="text-sm text-muted-foreground">{season.overview}</p>
        </div>
      </section>

      <section className="pt-20">
        <H3 className="mb-4">
          Episodes <span className="text-xs">{season.episodes.length}</span>
        </H3>
        <TvEpisodes episodes={season.episodes.toReversed()} />
      </section>
    </>
  )
}
