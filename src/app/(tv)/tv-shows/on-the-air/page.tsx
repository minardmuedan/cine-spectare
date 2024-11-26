import BackgroundMediaImage from '@/components/pages/background-image'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getOnTheAirTvShows } from '@/lib/tmdb/tv-shows'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function OnTheAirTvShowsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page || 1)

  const [error, tvShows] = await getOnTheAirTvShows(page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />

  return (
    <>
      <BackgroundMediaImage src={tvShows.results[0].backdrop_path} />
      <MediaList medias={tvShows.results.map(tv => serializeMedia({ ...tv, type: 'tv' }))} />

      <Pagination currentPage={page} maxPage={tvShows.total_pages} />
    </>
  )
}
