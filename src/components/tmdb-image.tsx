import { ImageProps } from 'next/image'

export default function TmdbImage({ src, ...props }: ImageProps) {
  return <img src={`https://image.tmdb.org/t/p/w500${src}`} {...props} />
}
