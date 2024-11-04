export default function BackgroundMediaImage({ src }: { src: string }) {
  return (
    <div className="max-w-screen absolute -top-14 left-0 -z-10 max-h-full w-full overflow-hidden opacity-20">
      <img src={`https://image.tmdb.org/t/p/w500${src}`} className="w-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0" role="overlay">
        <span className="sr-only">overlay gradient</span>
      </div>
    </div>
  )
}
