import tryCatchWrapper from '../helpers/try-catch'
import { TMDBFetcher } from './fetcher'
import { TMovies } from './type'

export const getMovies = () => tryCatchWrapper(async () => await TMDBFetcher<TMovies>('https://api.themoviedb.org/3/movie/now_playing'))
