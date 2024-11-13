import TmdbImage from '@/components/tmdb-image'
import { H3 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import ErrorResult from '@/components/ui/error-result'
import { getTvDetails } from '@/lib/tmdb/tv-shows'
import { StarIcon } from 'lucide-react'

export default async function TvSeasonsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, tv] = await getTvDetails(id)

  if (error)
    return (
      <>
        <H3>Seasons</H3>
        <ErrorResult error={error} className="h-[383.86] w-full" />
      </>
    )

  return (
    <>
      <header className="mb-2 flex items-center justify-between gap-2">
        <H3>
          Seasons <span className="text-xs">{tv.seasons.length}</span>
        </H3>

        <Button variant="link">View All</Button>
      </header>

      <ul className="flex flex-col gap-2">
        {tv.seasons
          .toReversed()
          .slice(0, 3)
          .map(season => (
            <li key={season.id} className="flex gap-3 rounded-md border bg-accent-muted p-3">
              <div className="aspect-[1/1.5] w-16">
                <TmdbImage src={season.poster_path} alt={`${season.name} poster`} className="object-cover" />
              </div>

              <div className="flex-1">
                <p>
                  {season.season_number} {season.name}
                </p>
                <p className="line-clamp-3 max-w-[700px] text-sm text-muted-foreground">{season.overview}</p>
              </div>

              <div className="flex flex-col items-end justify-between gap-1 text-xs text-muted-foreground">
                <div className="flex gap-2 text-yellow-500">
                  <StarIcon size={16} />
                  <p>{season.vote_average?.toFixed(1)}</p>
                </div>

                <p>{season.air_date}</p>
                <p>{season.episode_count} episode/s</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}
