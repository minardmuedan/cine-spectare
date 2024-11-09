import BackgroundMediaImage from '@/components/pages/background-image'
import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import MediaGrid from '@/features/media/components/grid'
import MediaCard from '@/features/media/components/media-card'
import { getMovies } from '@/lib/tmdb/movies'

export default async function PopularMovies() {
  const [error, movies] = await getMovies()
  if (error) return <p>{error.message}</p>

  return (
    <Section>
      <BackgroundMediaImage src={movies.results[0].backdrop_path} />
      <PageHeader title="Popular Movies" description="Discover the latest trending films loved by audiences worldwide" />

      <MediaGrid>
        {movies.results.map(movie => (
          <MediaCard
            key={movie.id}
            media={{
              id: movie.id,
              title: movie.title,
              posterPath: movie.poster_path,
              backdropPath: movie.backdrop_path,
              voteAverage: movie.vote_average,
              releaseDate: movie.release_date,
              type: 'movie',
            }}
          />
        ))}
      </MediaGrid>
    </Section>
  )
}
