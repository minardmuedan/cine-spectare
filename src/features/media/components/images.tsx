import TmdbImage from '@/components/tmdb-image'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Image } from '@/lib/tmdb/_type/movie'
import React from 'react'

export function MediaPosters({ posters }: { posters: Image[] }) {
  return (
    <MediaImagesDialog images={posters} type="image">
      <ul className={`grid aspect-square w-full gap-1 ${posters.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {posters.slice(0, 4).map((poster, i) => (
          <li key={i} className="relative w-full overflow-hidden rounded-sm">
            <TmdbImage
              src={poster.file_path}
              alt="movie poster"
              fill
              sizes="(min-width: 1860px) 249px, (min-width: 1040px) calc(15.25vw - 32px), (min-width: 780px) calc(50vw - 120px), calc(50vw - 10px)"
              className="object-cover"
            />
            {i == 3 && posters.length - 4 > 0 && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{posters.length - 4}+</div>
            )}
          </li>
        ))}
      </ul>
    </MediaImagesDialog>
  )
}

export function MediaBackdrops({ backdrops }: { backdrops: Image[] }) {
  return (
    <MediaImagesDialog images={backdrops} type="backdrops">
      <ul className={`grid aspect-square w-full gap-1 ${backdrops.length > 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {backdrops.slice(0, 3).map((poster, i) => (
          <li key={i} className={`relative w-full overflow-hidden rounded-sm ${i == 0 && 'col-span-2'}`}>
            <TmdbImage
              src={poster.file_path}
              alt="movie poster"
              fill
              sizes={
                i == 0
                  ? '(min-width: 1860px) 501px, (min-width: 1040px) calc(30.38vw - 58px), (min-width: 780px) calc(100vw - 235px), calc(100vw - 16px)'
                  : '(min-width: 1860px) 249px, (min-width: 1040px) calc(15.25vw - 32px), (min-width: 780px) calc(50vw - 120px), calc(50vw - 10px)'
              }
              className="object-cover"
            />
            {i == 2 && backdrops.length - 3 > 0 && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{backdrops.length - 3}+</div>
            )}
          </li>
        ))}
      </ul>
    </MediaImagesDialog>
  )
}

function MediaImagesDialog({ images, children, type }: { images: Image[]; children: React.ReactNode; type: 'backdrops' | 'image' }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full transition-opacity hover:opacity-75">
        {children}
        <span className="sr-only">media images</span>
      </DialogTrigger>

      <DialogContent className="max-w-6xl">
        <DialogHeader title="Media Images" description="Browse Media Poster or Backdrop Images" className="hidden" />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, i) => (
            <li key={i} className={`relative ${type == 'backdrops' ? 'aspect-[100/56.47]' : 'aspect-[1/1.5]'}`}>
              <TmdbImage
                src={image.file_path}
                alt="media image"
                fill
                sizes="(min-width: 1220px) 260px, (min-width: 780px) 22.14vw, (min-width: 640px) calc(33.33vw - 29px), calc(50vw - 38px)"
              />
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
