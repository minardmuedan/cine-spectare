import { H4 } from '@/components/typography'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaVideosDialog from '@/features/media/components/videos-dialog'
import { getTvVideos } from '@/lib/tmdb/tv-shows'

export default async function TvVideosPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, videos] = await getTvVideos(id)

  if (error)
    return (
      <li>
        <H4>Videos</H4>
        <ErrorResult error={error} className="aspect-square h-auto" />
      </li>
    )

  return (
    <li>
      <H4>Videos</H4>
      {videos.results?.length ? <MediaVideosDialog videos={videos} /> : <NoResult className="aspect-square h-auto" />}
    </li>
  )
}
