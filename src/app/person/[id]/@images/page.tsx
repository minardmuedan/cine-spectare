import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { MediaPosters } from '@/features/media/components/images'
import { getPersonImages } from '@/lib/tmdb/person'

export default async function PersonImagesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [error, images] = await getPersonImages(id)

  if (error) return <ErrorResult error={error} className="aspect-square h-auto" />

  return images.profiles?.length ? <MediaPosters posters={images.profiles} /> : <NoResult className="aspect-square h-auto" />
}
