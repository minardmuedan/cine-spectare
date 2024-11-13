import TmdbImage from '@/components/tmdb-image'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Image } from '@/lib/tmdb/_movie-type'
import React from 'react'

export default function MediaImages({ images, children }: { images: Image[]; children: React.ReactNode }) {
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
