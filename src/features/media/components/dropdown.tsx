'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TMedia } from '@/lib/schema'
import { EllipsisVerticalIcon } from 'lucide-react'

import ToggleLikeMutationButton from '../toggle-mutations/likes/toggle-like-mutation'
import ToggleWatchLaterMutationButton from '../toggle-mutations/watch-later/toggle-watch-later-mutation'
import ToggleAlreadyWatchedMutationButton from '../toggle-mutations/already-watched/toggle-already-watched-mutation'

export default function MediaMutationsDropdown({ media }: { media: TMedia }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon size={18} />
        <span className="sr-only">Open Media Menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex min-w-60 flex-col gap-1 p-2">
        <ToggleWatchLaterMutationButton media={media} render={props => <DropdownMenuItem {...props} />} />
        <ToggleLikeMutationButton media={media} render={props => <DropdownMenuItem {...props} />} />
        <ToggleAlreadyWatchedMutationButton media={media} render={props => <DropdownMenuItem {...props} />} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
