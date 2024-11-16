import { H3 } from '@/components/typography'
import { buttonVariants } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { CreditAvatar, CreditCharacter, CreditName } from '@/features/media/components/credit'
import { TTvAggregatedCredits } from '@/lib/tmdb/_type/tv'
import { getTvAggregatedCredits } from '@/lib/tmdb/tv-shows'
import Link from 'next/link'

export default async function TvCreditsLoadingPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, credits] = await getTvAggregatedCredits(id)

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

  return (
    <Carousel opts={{ slidesToScroll: 'auto' }}>
      <header className="mb-4 flex items-center justify-between gap-2">
        <H3>
          Credits <span className="text-sm">{credits.cast.length}</span>
        </H3>

        <div className="flex gap-2">
          <FullCredits credits={credits} />
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </header>

      <CarouselContent>
        {credits.cast.map((cast, i) => {
          const characters = cast.roles.map(role => role.character).join(', ')

          return (
            <CarouselItem key={i} className="basis-28">
              <Link href={`/person/${cast.id}`}>
                <CreditAvatar {...cast} />

                <div className="w-full overflow-hidden text-center *:overflow-hidden *:text-ellipsis *:whitespace-nowrap">
                  <CreditName name={cast.name} />
                  <CreditCharacter character={characters} />
                </div>
              </Link>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}

const FullCredits = ({ credits }: { credits: TTvAggregatedCredits }) => (
  <Dialog>
    <DialogTrigger className={buttonVariants({ variant: 'link' })}>View All</DialogTrigger>
    <DialogContent className="max-w-2xl">
      <DialogHeader title="Full Tv Credits" description="Discover the faces behind the characters" />

      <ul className="flex flex-col gap-2">
        {credits.cast.map(cast => (
          <li key={cast.id}>
            <Link href={`/person/${cast.id}`} className="group">
              <div className="flex gap-4 rounded-lg border bg-accent-muted p-2 transition-colors group-hover:bg-accent">
                <CreditAvatar {...cast} className="h-20 w-20" />
                <div className="flex-1">
                  <p>{cast.name}</p>

                  <ul className="text-sm text-muted-foreground">
                    {cast.roles.map((role, i) => (
                      <li key={i} className="flex gap-1">
                        {role.character || 'unknown'} - {role.episode_count} episode/s
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </DialogContent>
  </Dialog>
)
