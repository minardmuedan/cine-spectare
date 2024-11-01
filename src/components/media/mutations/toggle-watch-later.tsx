import { Button } from '@/components/ui/button'
import { ClockIcon } from 'lucide-react'
import { TToggleMutationProps } from './_type'

export default function ToggleWatchLater({ media, render, ...buttonProps }: TToggleMutationProps) {
  const props = {
    ...buttonProps,
    disabled: false,
    onClick: () => console.log('watch later', media.title),
    children: (
      <>
        <ClockIcon />
        <p>Add to Watch Later</p>
      </>
    ),
  }

  if (render) return render(props)
  return <Button {...props} />
}
