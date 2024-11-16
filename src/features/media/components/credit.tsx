import TmdbImage from '@/components/tmdb-image'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

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

export function CreditName({ name }: { name: string }) {
  return (
    <p title={name} className="text-sm">
      {name}
    </p>
  )
}

export function CreditCharacter({ character }: { character: string }) {
  return (
    <p title={character} className="text-xs text-muted-foreground">
      {character}
    </p>
  )
}
