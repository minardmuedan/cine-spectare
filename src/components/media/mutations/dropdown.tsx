'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TMedia } from '@/lib/schema'
import { EllipsisVerticalIcon } from 'lucide-react'

import ToggleAlreadyWatched from './toggle-already-watch'
import ToggleLikeButton from './toggle-like'
import ToggleWatchLater from './toggle-watch-later'

export default function MediaMutationsDropdown({ media }: { media: TMedia }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon size={20} />
        <span className="sr-only">Open Media Menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex min-w-60 flex-col gap-1 p-2">
        <ToggleLikeButton media={media} render={props => <DropdownMenuItem {...props} />} />
        <ToggleWatchLater media={media} render={props => <DropdownMenuItem {...props} />} />
        <ToggleAlreadyWatched media={media} render={props => <DropdownMenuItem {...props} />} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
