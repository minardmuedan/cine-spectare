import BackgroundMediaImage from '@/components/pages/background-image'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { getUpcomingMovies } from '@/lib/tmdb/movies'
import { Fragment } from 'react'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function UpcomingMoviesPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page || 1)

  const [error, movies] = await getUpcomingMovies(page)

  if (error) return <p>{error.message}</p>
  return (
    <Fragment key={page}>
      <BackgroundMediaImage src={movies.results[0].backdrop_path} />

      <MediaList
        medias={movies.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          voteAverage: movie.vote_average,
          releaseDate: movie.release_date,
          type: 'movie',
        }))}
      />

      <Pagination currentPage={page} maxPage={movies.total_pages} />
    </Fragment>
  )
}
