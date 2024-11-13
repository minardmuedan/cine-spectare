import BackgroundMediaImage from '@/components/pages/background-image'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { getNowPlayingMovies } from '@/lib/tmdb/movies'
import { Fragment } from 'react'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function NowPlayingMoviesPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page || 1)

  const [error, movies] = await getNowPlayingMovies(page)

  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />
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
