import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaVideosDialog from '@/features/media/components/videos-dialog'
import { getTvSeasonVideos } from '@/lib/tmdb/tv-shows'

export default async function MovieVideosPage(props: { params: Promise<{ id: string; seasonNumber: string }> }) {
  const { id, seasonNumber } = await props.params
  const [error, videos] = await getTvSeasonVideos(id, seasonNumber)

  if (error) return <ErrorResult error={error} className="aspect-square h-auto" />
  return videos.results?.length ? <MediaVideosDialog videos={videos} /> : <NoResult className="aspect-square h-auto" />
}
