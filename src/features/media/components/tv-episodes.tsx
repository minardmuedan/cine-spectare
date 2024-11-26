'use client'

import TmdbImage, { tmdbImageBaseUrl } from '@/components/tmdb-image'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import NoResult from '@/components/ui/no-results'
import { TTvEpisode } from '@/lib/tmdb/_type/tv'
import { useState } from 'react'

export default function TvEpisodes({ episodes }: { episodes: TTvEpisode[] }) {
  const [activeEpisode, setActiveEpisode] = useState<TTvEpisode | null>(null)

  if (!episodes.length) return <NoResult />

  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      {episodes.map(episode => (
        <li
          key={episode.id}
          onClick={() => setActiveEpisode(episode)}
          className="group relative aspect-video cursor-pointer overflow-hidden rounded-md bg-accent"
        >
          <TmdbImage
            src={episode.still_path}
            alt={`${episode.name} poster`}
            fill
            sizes="(min-width: 1600px) 379px, (min-width: 1040px) calc(30.56vw - 104px), (min-width: 780px) calc(50vw - 192px), calc(50vw - 14px)"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 grid place-items-center bg-background/50 text-center">
            <p className="scale-100 text-sm transition-transform group-hover:scale-0">{episode.episode_number}</p>
            <div className="absolute scale-0 p-2 transition-transform group-hover:scale-100">
              <p className="text-sm">{episode.name}</p>
            </div>
          </div>
        </li>
      ))}

      {activeEpisode && (
        <Dialog defaultOpen onOpenChange={() => setActiveEpisode(null)}>
          <DialogContent
            style={{ backgroundImage: `url(${tmdbImageBaseUrl}w780${activeEpisode.still_path})` }}
            className="max-w-3xl bg-background/90 bg-cover bg-blend-darken"
          >
            <div>
              <p className="mb-1 text-center text-xs text-muted-foreground sm:text-start">Episode {activeEpisode.episode_number}</p>
              <DialogHeader title={activeEpisode.name} description={activeEpisode.overview} />
            </div>

            <div className="relative aspect-video w-full">
              <TmdbImage
                src={activeEpisode.still_path}
                alt={`${activeEpisode.name} poster`}
                fill
                sizes="(min-width: 820px) 697px, calc(93.6vw - 46px)"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ul>
  )
}
