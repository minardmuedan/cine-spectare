import HomepageMovies from '@/components/homepage/movies'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <section className="flex min-h-[75dvh] flex-col items-center justify-center gap-2 border px-2 py-20 text-center">
        <p className="text-sm text-muted-foreground">finding something to watch? this might be -</p>
        <h1 className="font-bolota text-3xl md:text-5xl">
          YOUR ULTIMATE <br /> ENTERTAINMENT DESTINATION
        </h1>
      </section>

      <nav className="mb-5 flex gap-2 bg-accent px-4 py-1 *:flex-1">
        <Button variant="ghost" className="pointer-events-none bg-background">
          Movies
        </Button>
        <Button variant="ghost">Tv Shows</Button>
      </nav>

      <HomepageMovies />
    </>
  )
}
