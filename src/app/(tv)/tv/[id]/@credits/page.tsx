import { H3 } from '@/components/typography'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { CreditAvatar, CreditCharacter, CreditName } from '@/features/media/components/credit'
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
      <div className="mb-4 flex items-center justify-between gap-2">
        <H3>
          Credits <span className="text-sm">{credits.cast.length}</span>
        </H3>

        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

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
