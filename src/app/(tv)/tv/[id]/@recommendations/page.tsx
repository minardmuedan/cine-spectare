import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaList from '@/features/media/components/list'
import { getTvRecommendations } from '@/lib/tmdb/tv-shows'

export default async function TvRecommendationsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, movies] = await getTvRecommendations(id)

  if (error) return <ErrorResult error={error} className="h-64" />
  if (!movies.results.length) return <NoResult className="h-64" />

  return (
    <MediaList
      medias={movies.results.map(tv => ({
        id: tv.id,
        title: tv.name,
        posterPath: tv.poster_path,
        backdropPath: tv.backdrop_path,
        voteAverage: tv.vote_average,
        releaseDate: tv.first_air_date,
        type: 'tv',
      }))}
    />
  )
}
