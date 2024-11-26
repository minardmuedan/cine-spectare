import BackgroundMediaImage from '@/components/pages/background-image'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getGenreTvShows } from '@/lib/tmdb/tv-shows'
import { Fragment } from 'react'

export default async function GenreTvPage(props: { params: Promise<{ id: string }>; searchParams: Promise<{ page?: string }> }) {
  const { id } = await props.params
  const currentPage = (await props.searchParams).page
  const page = Number(currentPage || 1)

  const [error, tvShows] = await getGenreTvShows(id, page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />

  return (
    <>
      <BackgroundMediaImage src={tvShows.results?.[0]?.backdrop_path} />

      <MediaList medias={tvShows.results.map(movie => serializeMedia({ ...movie, type: 'tv' }))} />
      <Pagination currentPage={page} maxPage={tvShows.total_pages} />
    </>
  )
}
