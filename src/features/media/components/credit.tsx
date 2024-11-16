import TmdbImage from '@/components/tmdb-image'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function CreditAvatar({ name, profile_path }: { name: string; profile_path?: string }) {
  if (!profile_path)
    return (
      <Avatar className="aspect-square h-auto w-full">
        <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
      </Avatar>
    )
  return <TmdbImage title={name} src={profile_path!} alt={`${name} profile`} className="aspect-square w-full rounded-full object-cover" />
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
