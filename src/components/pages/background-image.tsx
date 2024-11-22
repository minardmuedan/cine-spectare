import TmdbImage from '../tmdb-image'

export default function BackgroundMediaImage({ src }: { src: string }) {
  return (
    <div className="max-w-screen absolute -top-14 left-0 -z-10 max-h-full w-full overflow-hidden opacity-20">
      <TmdbImage src={src} alt="media page background" className="w-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0">
        <span className="sr-only">overlay gradient</span>
      </div>
    </div>
  )
}
