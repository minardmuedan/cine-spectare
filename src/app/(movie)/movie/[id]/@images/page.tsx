import { H4 } from '@/components/typography'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { MediaBackdrops, MediaPosters } from '@/features/media/components/images'
import { getMovieImages } from '@/lib/tmdb/movies'

export default async function MovieImagesPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, images] = await getMovieImages(id)

  if (error)
    return ['Posters', 'Backdrops'].map((title, i) => (
      <li key={i}>
        <H4>{title}</H4>
        <ErrorResult error={error} className="aspect-square h-auto" />
      </li>
    ))

  return (
    <>
      <li>
        <H4>Posters</H4>
        {images.posters?.length ? <MediaPosters posters={images.posters} /> : <NoResult className="aspect-square h-auto" />}
      </li>

      <li>
        <H4>Backdrops</H4>
        {images.backdrops?.length ? <MediaBackdrops backdrops={images.backdrops} /> : <NoResult className="aspect-square h-auto" />}
      </li>
    </>
  )
}
