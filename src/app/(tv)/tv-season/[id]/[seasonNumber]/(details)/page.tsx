import TmdbImage from '@/components/tmdb-image'
import { H3 } from '@/components/typography'
import { getTvSeason } from '@/lib/tmdb/tv-shows'

export default async function TvSeasonDetailsPage(props: { params: Promise<{ id: string; seasonNumber: string }> }) {
  const { id, seasonNumber } = await props.params
  const [error, season] = await getTvSeason(id, seasonNumber)

  if (error) return <p>{error.message}</p>

  return (
    <>
      <section className="flex flex-col items-center gap-5 pt-20 text-center">
        <div className="aspect-[1/1.5] w-full max-w-72 overflow-hidden rounded">
          <TmdbImage src={season.poster_path} alt={`${season.name} poster`} className="object-cover" />
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
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
          {season.episodes.toReversed().map((episode, i) => (
            <li key={i} className="group relative aspect-square overflow-hidden rounded-md bg-accent">
              <TmdbImage src={episode.still_path} alt={`${episode.name} poster`} className="size-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-background/50 text-center">
                <p className="scale-100 text-sm transition-transform group-hover:scale-0">{episode.episode_number}</p>
                <div className="absolute scale-0 p-2 transition-transform group-hover:scale-100">
                  <p className="text-sm">{episode.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
