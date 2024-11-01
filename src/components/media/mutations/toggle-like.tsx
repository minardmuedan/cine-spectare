import { Button } from '@/components/ui/button'
import { Loader2Icon, StarIcon } from 'lucide-react'
import { TToggleMutationProps } from './_type'
import { useIsLikeMutating, useLikeMutation, useLikes } from '@/hooks/media'

export default function ToggleLike({ media, render, ...buttonProps }: TToggleMutationProps) {
  const { data: likes, isError, isPending, isFetching } = useLikes()
  const { mutate } = useLikeMutation()

  const isMutating = useIsLikeMutating()
  const isAlreadyLiked = !!likes?.some(like => like.mediaId == media.id)

  const props = {
    ...buttonProps,
    disabled: isError || isMutating || isFetching,
    children: (
      <>
        {isPending || isMutating ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <StarIcon className={`${isAlreadyLiked && 'fill-yellow-500 stroke-yellow-500'}`} />
        )}

        {isAlreadyLiked ? 'Remove from Like' : 'Add to Like'}
      </>
    ),
    onClick: () => mutate(media),
  }

  if (render) return render(props)
  return <Button {...props} />
}
