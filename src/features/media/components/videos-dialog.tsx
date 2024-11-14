'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { TMovieVideos } from '@/lib/tmdb/_movie-type'
import { Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'

export default function MediaVideosDialog({ videos: videosData }: { videos: TMovieVideos }) {
  const typeOrder = ['Opening Credits', 'Trailer', 'Teaser', 'Clip', 'Behind the Scenes', 'Bloopers', 'Featurette']
  const videos = videosData.results.sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type))

  const [isLoading, setIsLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState(videos[0])

  return (
    <Dialog>
      <DialogTrigger className="transition-opacity hover:opacity-75">
        <ul className="grid aspect-square w-full grid-cols-2 gap-1">
          {videosData.results.slice(0, 3).map((video, i) => (
            <li key={i} className={`relative w-full overflow-hidden rounded-sm ${i == 0 && 'col-span-2'}`}>
              <img src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`} alt="video thumbnail" className="size-full object-cover" />
              {i == 2 && videosData.results.length - 3 > 0 && (
                <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{videosData.results.length - 3}+</div>
              )}
            </li>
          ))}
        </ul>
        <span className="sr-only">media videos</span>
      </DialogTrigger>

      <DialogContent className="pt-10 md:max-w-3xl">
        <DialogHeader title="Media Videos" description="Watch trailers of media" className="hidden" />

        <Carousel opts={{ dragFree: true, startIndex: videos.indexOf(activeVideo) - 1 }} className="relative">
          <CarouselContent className="-ml-2 p-1">
            {videos.map(video => (
              <CarouselItem key={video.id} className="basis-[29%] pl-2">
                <button
                  onClick={() => (setActiveVideo(video), setIsLoading(true))}
                  className={`aspect-video w-full rounded transition-opacity ${activeVideo.id == video.id ? 'pointer-events-none p-1 ring-2 ring-primary' : 'opacity-50 hover:opacity-100'}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                    alt="video thumbnail"
                    className="size-full rounded-sm object-cover"
                  />
                  <p className="mt-1 text-sm">{video.type}</p>
                  <span className="sr-only">check video {video.name}</span>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="w-full">
          <p className="mb-1 text-sm text-muted-foreground">{activeVideo.name}</p>

          <div className="relative">
            {isLoading && (
              <div
                style={{
                  backgroundImage: `url('https://img.youtube.com/vi/${activeVideo.key}/maxresdefault.jpg')`,
                }}
                className="absolute inset-0 flex items-center justify-center bg-background/75 bg-cover bg-blend-multiply"
              >
                <Loader2Icon className="animate-spin" />
              </div>
            )}

            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.key}`}
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              className={`aspect-video w-full flex-1 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
