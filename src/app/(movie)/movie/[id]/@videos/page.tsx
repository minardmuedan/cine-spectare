import { getMovieVideos } from '@/lib/tmdb/movies'

export default async function MovieVideosPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, videos] = await getMovieVideos(id)

  if (error) return <p>{error.message}</p>

  return (
    <>
      <li>
        <h4 className="mb-2 text-center text-sm md:text-start">Videos</h4>

        <ul className="grid aspect-square w-full grid-cols-2 gap-1">
          {videos.results.slice(0, 3).map((video, i) => (
            <li key={i} className={`relative w-full overflow-hidden rounded-sm ${i == 0 && 'col-span-2'}`}>
              <img src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`} alt="video thumbnail" className="object-over size-full" />
              {i == 2 && <div className="absolute inset-0 z-10 grid place-items-center bg-background/75 text-sm">{videos.results.length - 3}+</div>}
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}
