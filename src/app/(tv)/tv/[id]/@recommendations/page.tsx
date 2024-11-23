import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getTvRecommendations } from '@/lib/tmdb/tv-shows'

export default async function TvRecommendationsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, tvShows] = await getTvRecommendations(id)

  if (error) return <ErrorResult error={error} className="h-64" />
  if (!tvShows.results.length) return <NoResult className="h-64" />

  return <MediaList medias={tvShows.results.map(tv => serializeMedia({ ...tv, type: 'tv' }))} />
}
