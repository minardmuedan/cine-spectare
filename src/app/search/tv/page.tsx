import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { getSearchTv } from '@/lib/tmdb/search'

export default async function SearchTvPage({ searchParams }: { searchParams: Promise<{ query: string; page: string }> }) {
  const { query, page: currentPage } = await searchParams
  const page = Number(currentPage || 1)

  const [error, tvShows] = await getSearchTv(query, page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-340px)]" />

  if (!tvShows.results?.length) return <NoResult className="min-h-[calc(100dvh-340px)]" />
  return (
    <>
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

      <Pagination currentPage={page} maxPage={tvShows.total_pages} url={`?query=${query}`} />
    </>
  )
}
