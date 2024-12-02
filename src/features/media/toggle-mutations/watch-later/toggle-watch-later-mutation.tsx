'use client'

import { Button } from '@/components/ui/button'
import { ClockIcon, Loader2Icon, TriangleAlertIcon } from 'lucide-react'
import { TToggleMutationProps } from '../../type'
import { useIsWatchLaterMutating, useWatchLater, useWatchLaterMutation } from './hooks'
import { useSession } from '@/hooks/session'

export default function ToggleWatchLaterMutationButton({ media, render, ...buttonProps }: TToggleMutationProps) {
  const { data: session } = useSession()

  const { data: watchLaterMedias, isError, isPending: gettingWatchLater } = useWatchLater()
  const { mutate } = useWatchLaterMutation()

  const isMutating = useIsWatchLaterMutating()
  const isAlreadyInWatchLater = watchLaterMedias?.find(watchLater => watchLater.mediaId === media.id && watchLater.type === media.type)

  const props = {
    ...buttonProps,
    disabled: isError || isMutating || gettingWatchLater,
    onClick: () => mutate(media),
    children: (
      <>
        {isError ? (
          <TriangleAlertIcon />
        ) : gettingWatchLater || isMutating ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <ClockIcon className={`${isAlreadyInWatchLater && 'stroke-blue-500'}`} />
        )}

        {isAlreadyInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
      </>
    ),
  }

  if (!session) return null

  if (render) return render(props)
  return <Button {...props} variant="outline" />
}
