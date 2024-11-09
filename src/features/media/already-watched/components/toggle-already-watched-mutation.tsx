'use client'

import { Button } from '@/components/ui/button'
import { useIsAlreadyWatchedMutating, useAlreadyWatched, useAlreadyWatchedMutation } from '../hooks'
import { CheckCheckIcon, Loader2Icon } from 'lucide-react'
import { TToggleMutationProps } from '../../type'

export default function ToggleAlreadyWatchedMutationButton({ media, render, ...buttonProps }: TToggleMutationProps) {
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
        {gettingAlreadyWatched || isMutating ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <CheckCheckIcon className={`${isInAlreadyWatched && 'stroke-green-500'}`} />
        )}

        {isInAlreadyWatched ? 'Remove Already Watched' : 'Already Watched'}
      </>
    ),
  }

  if (render) return render(props)
  return <Button {...props} variant="outline" />
}
