import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaList from '@/features/media/components/list'
import { getSearchTv } from '@/lib/tmdb/search'

export default async function SearchTvPage({ searchParams }: { searchParams: Promise<{ query: string; page: string }> }) {
  const { query } = await searchParams

  const [error, tvShows] = await getSearchTv(query)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-340px)]" />

  if (!tvShows.results?.length) return <NoResult className="min-h-[calc(100dvh-340px)]" />
  return (
    <MediaList
      medias={tvShows.results.map(tv => ({
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
