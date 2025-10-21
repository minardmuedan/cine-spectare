import TmdbImage from '@/components/tmdb-image'
import { H3 } from '@/components/typography'
import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import VoteAverage from '@/features/media/components/vote-average'
import { TTvSeason } from '@/lib/tmdb/_type/tv'
import { getTvDetails } from '@/lib/tmdb/tv-shows'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export default async function TvSeasonsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, tv] = await getTvDetails(id)

  if (error)
    return (
      <>
        <H3 className="mb-2">Seasons</H3>
        <ErrorResult error={error} className="h-[383.86] w-full" />
      </>
    )

  if (!tv.seasons.length)
    return (
      <>
        <H3 className="mb-2">Seasons</H3>
        <NoResult className="h-[383.86] w-full" />
      </>
    )

  return (
    <>
      <Dialog>
        <header className="mb-2 flex items-center justify-between gap-2">
          <H3>
            Seasons <span className="text-xs">{tv.seasons.length}</span>
          </H3>

          {tv.seasons.length > 3 && <DialogTrigger className={buttonVariants({ variant: 'link' })}>View All</DialogTrigger>}
        </header>

        <ul className="flex flex-col gap-2">
          {tv.seasons
            .toReversed()
            .slice(0, 3)
            .map((season, i) => (
              <li key={i}>
                <Season season={season} tvId={id} />
              </li>
            ))}
        </ul>
        {tv.seasons.length > 3 && (
          <div className="mt-2 flex justify-center">
            <DialogTrigger className="group mt-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              {tv.seasons.length - 3} more seasons <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
            </DialogTrigger>
          </div>
        )}

        <DialogContent className="max-w-3xl">
          <DialogHeader title={`${tv.name} Seasons`} description="Explore All TV Seasons" />

          <ul className="flex flex-col gap-2">
            {tv.seasons.toReversed().map((season, i) => (
              <li key={i}>
                <Season season={season} tvId={id} />
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  )
}

const Season = ({ season, tvId }: { season: TTvSeason; tvId: string }) => {
  return (
    <Link href={`/tv-season/${tvId}/${season.season_number}`}>
      <div className="flex gap-3 rounded-md border bg-accent-muted p-3 transition-colors hover:bg-accent">
        <div className="relative aspect-[1/1.5] w-16">
          <TmdbImage src={season.poster_path} alt={`${season.name} poster`} fill sizes="64px" className="object-cover" />
        </div>

        <div className="flex-1">
          <p className="font-medium">
            <span className="text-muted-foreground">{season.season_number}</span> {season.name}
          </p>
          <p className="line-clamp-3 max-w-[700px] text-sm text-muted-foreground">{season.overview}</p>
        </div>

        <div className="flex flex-col items-end justify-between gap-1 text-xs text-muted-foreground">
          <VoteAverage voteAverage={season.vote_average} />
          <p>{season.air_date}</p>
          <p>{season.episode_count} episode/s</p>
        </div>
      </div>
    </Link>
  )
}
