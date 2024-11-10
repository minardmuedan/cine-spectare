import { ImageProps } from 'next/image'

export default function TmdbImage({ src, alt, ...props }: ImageProps) {
  return <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} {...props} />
}
