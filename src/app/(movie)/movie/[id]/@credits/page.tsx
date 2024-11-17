import { H3 } from '@/components/typography'
import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaCredits, { MediaCreditsList } from '@/features/media/components/credits'
import { getMovieCredits } from '@/lib/tmdb/movies'

export default async function MovieCreditsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, credits] = await getMovieCredits(id)

  if (error)
    return (
      <>
        <H3 className="mb-4">Credits</H3>
        <ErrorResult error={error} className="h-[132px]" />
      </>
    )

  if (!credits.cast.length)
    return (
      <>
        <H3 className="mb-4">
          Credits <span className="text-sm">0</span>
        </H3>
        <NoResult className="h-[132px]" />
      </>
    )

  const casts = credits.cast.map(cast => ({ ...cast, role: cast.character }))
  const crews = credits.crew.map(crew => ({ ...crew, role: crew.job }))

  return (
    <MediaCredits credits={{ casts, crews }}>
      <Dialog>
        <DialogTrigger className={buttonVariants({ variant: 'link' })}>View All</DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader title="Full Movie Credits" description="Discover the faces behind the characters" />
          <div>
            <div className="sticky -top-6 z-10 bg-background py-2">
              <p className="font-medium text-muted-foreground">Cast</p>
            </div>
            <MediaCreditsList credits={credits.cast.map(cast => ({ ...cast, roles: [cast.character] }))} />
          </div>

          <div>
            <div className="sticky -top-6 z-10 bg-background py-2">
              <p className="font-medium text-muted-foreground">Crew</p>
            </div>
            <MediaCreditsList credits={credits.crew.map(crew => ({ ...crew, roles: [crew.job] }))} />
          </div>
        </DialogContent>
      </Dialog>
    </MediaCredits>
  )
}
