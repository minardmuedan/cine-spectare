import BackgroundMediaImage from '@/components/pages/background-image'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getGenreMovies } from '@/lib/tmdb/movies'

export default async function GenreMoviesPage(props: { params: Promise<{ id: string }>; searchParams: Promise<{ page?: string }> }) {
  const { id } = await props.params
  const currentPage = (await props.searchParams).page

  const page = Number(currentPage || 1)

  const [error, movies] = await getGenreMovies(id, page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />

  return (
    <>
      <BackgroundMediaImage src={movies.results[0]?.backdrop_path} />

      <MediaList medias={movies.results.map(movie => serializeMedia({ ...movie, type: 'movie' }))} />
      <Pagination currentPage={page} maxPage={movies.total_pages} />
    </>
  )
}
