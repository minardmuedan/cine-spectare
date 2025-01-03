'use client'

import TmdbImage from '@/components/tmdb-image'
import { ScrollArea } from '@/components/ui/scroll-area'
import VoteAverage from '@/features/media/components/vote-average'
import { TTvSeason } from '@/lib/tmdb/_type/tv'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function TvSeasonsSideNav({ id, seasonNumber, seasons }: { id: string; seasonNumber: string; seasons: TTvSeason[] }) {
  const activeSeasonNumber = Number(seasonNumber)
  const activeSeasonsRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    activeSeasonsRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <ScrollArea className="w-full flex-1">
      <nav className="p-1 pr-3">
        <ul className="flex flex-col gap-2">
          {seasons.toReversed().map((season, i) => (
            <li key={i} ref={season.season_number === activeSeasonNumber ? activeSeasonsRef : undefined}>
              <Link prefetch={false} href={`/tv-season/${id}/${season.season_number}`}>
                <div
                  className={`flex items-start gap-2 rounded-md border p-2 transition-colors ${activeSeasonNumber === season.season_number ? 'bg-primary/25 outline outline-2 outline-primary' : 'bg-accent-muted hover:bg-accent'}`}
                >
                  <div className="relative aspect-[1/1.5] h-16">
                    <TmdbImage src={season.poster_path} alt={`${season.name} poster`} fill sizes="43px" className="size-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">Season {season.season_number}</p>
                    <p className="text-sm font-normal text-muted-foreground">{season.name}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between self-stretch">
                    <VoteAverage voteAverage={season.vote_average} />
                    <p className="text-xs text-muted-foreground">{season.episode_count}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  )
}
