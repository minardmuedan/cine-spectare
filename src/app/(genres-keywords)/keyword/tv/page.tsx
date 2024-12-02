import BackgroundMediaImage from '@/components/pages/background-image'
import PageHeader from '@/components/pages/header'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getKeyword, getKeywordTvShows } from '@/lib/tmdb/genre-keyword'
import { GenresKeywordsNavbar } from '../../_components'

export async function generateMetadata(props: { searchParams: Promise<{ k: string; page?: string }> }) {
  const searchParams = await props.searchParams
  const keywordId = searchParams.k

  const keyword = await getKeyword(keywordId)

  return { title: keyword[1]?.name || 'Keyword Tv Shows', description: 'TV Show Keywords - Find Related Series' }
}

export default async function KeywordTvPage(props: { searchParams: Promise<{ k: string; page?: string }> }) {
  const searchParams = await props.searchParams

  const keywordId = searchParams.k

  const currentPage = searchParams.page
  const page = Number(currentPage || 1)

  const [kewordTvShows, keywordResult] = await Promise.all([getKeywordTvShows(keywordId, page), getKeyword(keywordId)])
  const [error, tvShows] = kewordTvShows
  const keyword = keywordResult[1]

  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />

  return (
    <>
      <PageHeader
        title={keyword ? `${keyword.name} tv shows` : `Tv Shows Keyword`}
        description={keyword ? `Browse popular '${keyword.name}' tv shows` : ''}
      />
      <GenresKeywordsNavbar active="tv" type="keyword" />

      <BackgroundMediaImage src={tvShows.results[0]?.backdrop_path} />

      <MediaList medias={tvShows.results.map(tv => serializeMedia({ ...tv, type: 'tv' }))} />
      <Pagination currentPage={page} maxPage={tvShows.total_pages} url={`?k=${keywordId}`} />
    </>
  )
}
