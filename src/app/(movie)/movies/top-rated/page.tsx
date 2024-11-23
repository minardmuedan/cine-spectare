import BackgroundMediaImage from '@/components/pages/background-image'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getTopRatedMovies } from '@/lib/tmdb/movies'
import { Fragment } from 'react'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function TopRatedMoviesPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page || 1)

  const [error, movies] = await getTopRatedMovies(page)

  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />
  return (
    <Fragment key={page}>
      <BackgroundMediaImage src={movies.results[0].backdrop_path} />
      <MediaList medias={movies.results.map(movie => serializeMedia({ ...movie, type: 'movie' }))} />

      <Pagination currentPage={page} maxPage={movies.total_pages} />
    </Fragment>
  )
}
