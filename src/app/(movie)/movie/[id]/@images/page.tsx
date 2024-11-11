import TmdbImage from '@/components/tmdb-image'
import { getMovieImages } from '@/lib/tmdb/movies'

export default async function MovieImagesPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, images] = await getMovieImages(id)

  if (error) return <p>{error.message}</p>

  return (
    <>
      <li>
        <h4 className="mb-2 text-center text-sm md:text-start">Posters</h4>
        <ul className="grid aspect-square w-full grid-cols-2 gap-1">
          {images.posters.slice(0, 4).map((poster, i) => (
            <li key={i} className="relative aspect-square w-full overflow-hidden rounded-sm">
              <TmdbImage src={poster.file_path} alt="movie poster" className="size-full object-cover" />
              {i == 3 && <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{images.posters.length - 4}+</div>}
            </li>
          ))}
        </ul>
      </li>

      <li>
        <h4 className="mb-2 text-center text-sm md:text-start">Backdrops</h4>
        <ul className="grid aspect-square w-full grid-cols-2 gap-1">
          {images.backdrops.slice(0, 3).map((poster, i) => (
            <li key={i} className={`relative w-full overflow-hidden rounded-sm ${i == 0 && 'col-span-2'}`}>
              <TmdbImage src={poster.file_path} alt="movie poster" className="size-full object-cover" />
              {i == 2 && <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{images.backdrops.length - 3}+</div>}
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}
