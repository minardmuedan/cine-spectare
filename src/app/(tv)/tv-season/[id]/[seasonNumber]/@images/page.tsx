import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { MediaPosters } from '@/features/media/components/images'
import { getTvSeasonPosters } from '@/lib/tmdb/tv-shows'

export default async function TvSeasonImagesPage(props: { params: Promise<{ id: string; seasonNumber: string }> }) {
  const { id, seasonNumber } = await props.params
  const [error, images] = await getTvSeasonPosters(id, seasonNumber)

  if (error) return <ErrorResult error={error} className="aspect-square h-auto" />
  return images.posters?.length ? <MediaPosters posters={images.posters} /> : <NoResult className="aspect-square h-auto" />
}
