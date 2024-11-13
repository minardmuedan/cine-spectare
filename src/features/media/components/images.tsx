import TmdbImage from '@/components/tmdb-image'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Image } from '@/lib/tmdb/_movie-type'
import React from 'react'

export function MediaPosters({ posters }: { posters: Image[] }) {
  return (
    <MediaImages images={posters}>
      <ul className={`grid aspect-square w-full gap-1 ${posters.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {posters.slice(0, 4).map((poster, i) => (
          <li key={i} className="relative w-full overflow-hidden rounded-sm">
            <TmdbImage src={poster.file_path} alt="movie poster" className="size-full object-cover" />
            {i == 3 && posters.length - 4 > 0 && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{posters.length - 4}+</div>
            )}
          </li>
        ))}
      </ul>
    </MediaImages>
  )
}

export function MediaBackdrops({ backdrops }: { backdrops: Image[] }) {
  return (
    <MediaImages images={backdrops}>
      <ul className={`grid aspect-square w-full gap-1 ${backdrops.length > 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {backdrops.slice(0, 3).map((poster, i) => (
          <li key={i} className={`relative w-full overflow-hidden rounded-sm ${i == 0 && 'col-span-2'}`}>
            <TmdbImage src={poster.file_path} alt="movie poster" className="size-full object-cover" />
            {i == 2 && backdrops.length - 3 > 0 && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{backdrops.length - 3}+</div>
            )}
          </li>
        ))}
      </ul>
    </MediaImages>
  )
}

function MediaImages({ images, children }: { images: Image[]; children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger className="transition-opacity hover:opacity-75">
        {children}
        <span className="sr-only">media images</span>
      </DialogTrigger>

      <DialogContent className="w-full lg:max-w-6xl">
        <DialogHeader title="Media Images" description="Browse Media Poster or Backdrop Images" className="hidden" />

        <ul className="columns-4 gap-4 *:mb-4">
          {images.map((image, i) => (
            <li key={i} className="flex flex-col border">
              <TmdbImage src={image.file_path} alt="media image" width={image.width} height={image.height} />

              <div className="flex justify-between text-sm">
                <p>{image.aspect_ratio}</p>
                <p>{image.width}</p>
                <p>{image.height}</p>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
