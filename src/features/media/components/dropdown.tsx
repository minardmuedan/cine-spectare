'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TMedia } from '@/lib/schema'
import { EllipsisVerticalIcon, LinkIcon } from 'lucide-react'

import ToggleAlreadyWatchedMutationButton from '../toggle-mutations/already-watched/toggle-already-watched-mutation'
import ToggleLikeMutationButton from '../toggle-mutations/likes/toggle-like-mutation'
import ToggleWatchLaterMutationButton from '../toggle-mutations/watch-later/toggle-watch-later-mutation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function MediaMutationsDropdown({ media }: { media: TMedia }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon size={18} />
        <span className="sr-only">Open Media Menu</span>
      </DropdownMenuTrigger>
      <Content media={media} />
    </DropdownMenu>
  )
}

export function Content({ media }: { media: TMedia }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = `${process.env.NEXT_PUBLIC_BASE_URL}/${media.type}/${media.id}`
    await navigator.clipboard.writeText(text).catch(() => toast.error('Failed to copy text'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DropdownMenuContent className="flex min-w-60 flex-col gap-1 p-2">
      <ToggleWatchLaterMutationButton media={media} render={props => <DropdownMenuItem {...props} />} />
      <ToggleLikeMutationButton media={media} render={props => <DropdownMenuItem {...props} />} />
      <ToggleAlreadyWatchedMutationButton media={media} render={props => <DropdownMenuItem {...props} />} />
      <DropdownMenuItem onClick={handleCopy}>
        <LinkIcon />
        {copied ? 'Copied' : 'Copy Link'}
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
