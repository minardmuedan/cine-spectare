import TmdbImage from '@/components/tmdb-image'
import NoResult from '@/components/ui/no-results'
import MediaImages from '@/features/media/components/images'
import { getMovieImages } from '@/lib/tmdb/movies'

export default async function MovieImagesPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, images] = await getMovieImages(id)

  if (error) return <p>{error.message}</p>

  return (
    <>
      <li>
        <h4 className="mb-2 text-center text-sm md:text-start">Posters</h4>
        {images.posters?.length ? (
          <MediaImages images={images.posters}>
            <ul className={`grid aspect-square w-full gap-1 ${images.posters.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {images.posters.slice(0, 4).map((poster, i) => (
                <li key={i} className="relative aspect-square w-full overflow-hidden rounded-sm">
                  <TmdbImage src={poster.file_path} alt="movie poster" className="size-full object-cover" />
                  {i == 3 && images.posters.length - 4 > 0 && (
                    <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{images.posters.length - 4}+</div>
                  )}
                </li>
              ))}
            </ul>
          </MediaImages>
        ) : (
          <NoResult className="aspect-square h-auto" />
        )}
      </li>

      <li>
        <h4 className="mb-2 text-center text-sm md:text-start">Backdrops</h4>
        {images.backdrops?.length ? (
          <MediaImages images={images.backdrops}>
            <ul className={`grid aspect-square w-full gap-1 ${images.backdrops.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {images.backdrops.slice(0, 3).map((poster, i) => (
                <li key={i} className={`relative w-full overflow-hidden rounded-sm ${i == 0 && 'col-span-2'}`}>
                  <TmdbImage src={poster.file_path} alt="movie poster" className="size-full object-cover" />
                  {i == 2 && images.backdrops.length - 3 > 0 && (
                    <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{images.backdrops.length - 3}+</div>
                  )}
                </li>
              ))}
            </ul>
          </MediaImages>
        ) : (
          <NoResult className="aspect-square h-auto" />
        )}
      </li>
    </>
  )
}
