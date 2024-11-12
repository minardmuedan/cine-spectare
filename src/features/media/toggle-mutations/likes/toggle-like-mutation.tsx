'use client'

import { Button } from '@/components/ui/button'
import { Loader2Icon, StarIcon, TriangleAlertIcon } from 'lucide-react'
import { TToggleMutationProps } from '../../type'
import { useIsLikeMutating, useLikeMutation, useLikes } from './hooks'

export default function ToggleLikeMutationButton({ media, render, ...buttonProps }: TToggleMutationProps) {
  const { data: likes, isError, isPending: gettingLikes } = useLikes()
  const { mutate } = useLikeMutation()

  const isMutating = useIsLikeMutating()
  const isAlreadyLiked = !!likes?.some(like => like.mediaId === media.id && like.type === media.type)

  const props = {
    ...buttonProps,
    disabled: isError || isMutating || gettingLikes,
    onClick: () => mutate(media),
    children: (
      <>
        {isError ? (
          <TriangleAlertIcon />
        ) : gettingLikes || isMutating ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <StarIcon className={`${isAlreadyLiked && 'fill-yellow-500 stroke-yellow-500'}`} />
        )}

        {isAlreadyLiked ? 'Remove from Like' : 'Add to Like'}
      </>
    ),
  }

  if (render) return render(props)
  return <Button {...props} variant="outline" />
}
