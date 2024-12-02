import BackgroundMediaImage from '@/components/pages/background-image'
import PageHeader from '@/components/pages/header'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getKeyword, getKeywordMovie } from '@/lib/tmdb/genre-keyword'
import { GenresKeywordsNavbar } from '../../_components'

export async function generateMetadata(props: { searchParams: Promise<{ k: string; page?: string }> }) {
  const searchParams = await props.searchParams
  const keywordId = searchParams.k

  const keyword = await getKeyword(keywordId)

  return { title: keyword[1]?.name || 'Keyword Movies', description: 'Movie Keywords - Discover Related Titles' }
}

export default async function KeywordMoviesPage(props: { searchParams: Promise<{ k: string; page?: string }> }) {
  const searchParams = await props.searchParams

  const keywordId = searchParams.k

  const currentPage = searchParams.page
  const page = Number(currentPage || 1)

  const [keywordMovies, keywordResult] = await Promise.all([getKeywordMovie(keywordId, page), getKeyword(keywordId)])
  const [error, movies] = keywordMovies
  const keyword = keywordResult[1]

  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />

  return (
    <>
      <PageHeader
        title={keyword ? `${keyword.name} movies` : `Movies Keyword`}
        description={keyword ? `Browse popular '${keyword.name}' movies` : ''}
      />
      <GenresKeywordsNavbar active="movie" type="keyword" />

      <BackgroundMediaImage src={movies.results[0]?.backdrop_path} />

      <MediaList medias={movies.results.map(movie => serializeMedia({ ...movie, type: 'movie' }))} />
      <Pagination currentPage={page} maxPage={movies.total_pages} url={`?k=${keywordId}`} />
    </>
  )
}
