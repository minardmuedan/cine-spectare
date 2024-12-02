import BackgroundMediaImage from '@/components/pages/background-image'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { movieGenres } from '@/lib/tmdb/genre'
import { getGenreMovies } from '@/lib/tmdb/genre-keyword'

export async function generateMetadata(props: { searchParams: Promise<{ g: string }> }) {
  const searchParams = await props.searchParams
  const genreId = Number(searchParams.g)

  return { title: movieGenres.find(genre => genre.id === genreId)?.name ?? 'Genre Movies', description: 'Movie Genres - Explore by Category' }
}

export default async function GenreMoviesPage(props: { searchParams: Promise<{ g: string; page?: string }> }) {
  const searchParams = await props.searchParams

  const genreId = searchParams.g

  const currentPage = searchParams.page
  const page = Number(currentPage || 1)

  const [error, movies] = await getGenreMovies(genreId, page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />

  return (
    <>
      <BackgroundMediaImage src={movies.results[0]?.backdrop_path} />

      <MediaList medias={movies.results.map(movie => serializeMedia({ ...movie, type: 'movie' }))} />
      <Pagination currentPage={page} maxPage={movies.total_pages} url={`?g=${genreId}`} />
    </>
  )
}
