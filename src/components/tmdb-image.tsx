'use client'

import { cn } from '@/lib/utils'
import Image, { ImageLoaderProps, ImageProps } from 'next/image'

export const tmdbImageBaseUrl = 'https://image.tmdb.org/t/p'

export const tmdbLoader = ({ src, width }: ImageLoaderProps) => {
  const availableWidths = [92, 154, 185, 342, 500, 780]
  const closestWidth = availableWidths.find(w => w >= width) || availableWidths[availableWidths.length - 1]
  return `${tmdbImageBaseUrl}/w${closestWidth}${src}`
}

export default function TmdbImage({ src, alt, className, ...props }: Omit<ImageProps, 'loader'>) {
  if (!src)
    return (
      <div className="flex size-full items-center justify-center border-2 border-dashed bg-accent-muted">
        <p className="text-sm text-muted-foreground">no image</p>
      </div>
    )

  return <Image src={src} alt={alt} loader={tmdbLoader} className={cn('bg-accent', className)} {...props} />
}
