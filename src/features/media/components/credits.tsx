import TmdbImage from '@/components/tmdb-image'
import { H3 } from '@/components/typography'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Carousel, CarouselPrevious, CarouselNext, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Credit = { id: number; name: string; profile_path?: string; role: string }

export default function MediaCredits({ credits, children }: { credits: { casts: Credit[]; crews: Credit[] }; children: React.ReactNode }) {
  return (
    <Carousel opts={{ slidesToScroll: 'auto' }}>
      <header className="mb-4 flex items-center justify-between gap-2">
        <H3>
          Credits <span className="text-sm">{credits.casts.length + credits.crews.length}</span>
        </H3>

        <div className="flex items-center gap-2">
          {children}
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </header>

      <CarouselContent>
        {credits.casts.slice(0, 15).map(({ id, name, role, profile_path }, i) => (
          <CarouselItem key={i} className="basis-28">
            <Link href={`/person/${id}`}>
              <CreditAvatar {...{ name, profile_path }} />

              <div className="w-full overflow-hidden text-center *:overflow-hidden *:text-ellipsis *:whitespace-nowrap">
                <p title={name} className="text-sm">
                  {name}
                </p>
                <p title={role} className="text-xs text-muted-foreground">
                  {role}
                </p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export function MediaCreditsList({ credits }: { credits: (Omit<Credit, 'role'> & { roles: string[] })[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {credits.map(({ id, name, profile_path, roles }, i) => (
        <li key={i}>
          <Link href={`/person/${id}`} className="group">
            <div className="flex gap-4 rounded-lg border bg-accent-muted p-2 transition-colors group-hover:bg-accent">
              <CreditAvatar {...{ name, profile_path }} className="h-20 w-20" />
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

export function CreditAvatar({ name, profile_path, className }: { name: string; profile_path?: string; className?: string }) {
  if (!profile_path)
    return (
      <Avatar className={cn('aspect-square h-auto w-full', className)}>
        <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
      </Avatar>
    )
  return (
    <div className={cn('aspect-square w-full overflow-hidden rounded-full object-cover', className)}>
      <TmdbImage title={name} src={profile_path!} alt={`${name} profile`} className="size-full object-cover" />
    </div>
  )
}
