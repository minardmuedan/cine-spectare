'use client'

import { Button } from '@/components/ui/button'
import { useIsAlreadyWatchedMutating, useAlreadyWatched, useAlreadyWatchedMutation } from './hooks'
import { CheckCheckIcon, Loader2Icon, TriangleAlertIcon } from 'lucide-react'
import { TToggleMutationProps } from '../../type'
import { useSession } from '@/hooks/session'

export default function ToggleAlreadyWatchedMutationButton({ media, render, ...buttonProps }: TToggleMutationProps) {
  const { data: session } = useSession()
  const { data: alreadyWatchedMedias, isError, isPending: gettingAlreadyWatched } = useAlreadyWatched()
  const { mutate } = useAlreadyWatchedMutation()

  const isMutating = useIsAlreadyWatchedMutating()
  const isInAlreadyWatched = alreadyWatchedMedias?.find(alreadyWatched => alreadyWatched.mediaId === media.id && alreadyWatched.type === media.type)

  const props = {
    ...buttonProps,
    disabled: isError || isMutating || gettingAlreadyWatched,
    onClick: () => mutate(media),
    children: (
      <>
        {isError ? (
          <TriangleAlertIcon />
        ) : gettingAlreadyWatched || isMutating ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <CheckCheckIcon className={`${isInAlreadyWatched && 'stroke-green-500'}`} />
        )}

        {isInAlreadyWatched ? 'Remove Already Watched' : 'Already Watched'}
      </>
    ),
  }

  if (!session) return null

  if (render) return render(props)
  return <Button {...props} variant="outline" />
}
