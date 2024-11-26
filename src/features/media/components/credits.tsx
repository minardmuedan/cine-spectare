import TmdbImage from '@/components/tmdb-image'
import { H3 } from '@/components/typography'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { Carousel, CarouselPrevious, CarouselNext, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Credit = { id: number; name: string; profile_path?: string; roles: string[] }

export default function MediaCredits({ credits }: { credits: { casts: Credit[]; crews: Credit[] } }) {
  return (
    <Carousel opts={{ slidesToScroll: 'auto', dragFree: true }}>
      <header className="mb-4 flex items-center justify-between gap-2">
        <H3>
          Cast <span className="text-sm">{credits.casts.length}</span>
        </H3>

        <div className="flex items-center gap-2">
          <MediaCreditsDialog credits={credits} />
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </header>

      <CarouselContent>
        {credits.casts.slice(0, 15).map(({ id, name, roles, profile_path }, i) => (
          <CarouselItem key={i} className="basis-28">
            <Link href={`/person/${id}`}>
              <PersonAvatar {...{ name, profile_path }} sizes="96px" />

              <div className="w-full overflow-hidden text-center *:overflow-hidden *:text-ellipsis *:whitespace-nowrap">
                <p title={name} className="text-sm">
                  {name}
                </p>
                <p title={roles.join(', ')} className="text-xs text-muted-foreground">
                  {roles.join(', ')}
                </p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export function MediaCreditsDialog({ credits }: { credits: { casts: Credit[]; crews: Credit[] } }) {
  const mediaCredits = [
    { title: 'Casts', credits: credits.casts },
    { title: 'Crews', credits: credits.crews },
  ]

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: 'link' })}>View More</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader title="Full Media Credits" description="Discover the faces behind the characters" />

        {mediaCredits.map((mediaCredit, i) => (
          <div key={i}>
            <div className="sticky -top-6 z-10 bg-background py-2">
              <p className="font-medium text-muted-foreground">{mediaCredit.title}</p>
            </div>

            <MediaCreditsList credits={mediaCredit.credits} />
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}

export function MediaCreditsList({ credits }: { credits: Credit[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {credits.map(({ id, name, profile_path, roles }, i) => (
        <li key={i}>
          <Link href={`/person/${id}`} className="group">
            <div className="flex gap-4 rounded-lg border bg-accent-muted p-2 transition-colors group-hover:bg-accent">
              <PersonAvatar {...{ name, profile_path }} sizes="96px" className="h-20 w-20" />
              <div className="flex-1">
                <p>{name}</p>

                <ul className="text-sm text-muted-foreground">
                  {roles.map((role, i2) => (
                    <li key={i2} className="flex gap-1">
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function PersonAvatar({ name, profile_path, className, sizes }: { name: string; profile_path?: string; className?: string; sizes: string }) {
  if (!profile_path)
    return (
      <Avatar className={cn('aspect-square h-auto w-full', className)}>
        <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
      </Avatar>
    )
  return (
    <div className={cn('relative aspect-square w-full overflow-hidden rounded-full', className)}>
      <TmdbImage title={name} src={profile_path!} alt={`${name} profile`} fill sizes={sizes} className="object-cover" />
    </div>
  )
}
