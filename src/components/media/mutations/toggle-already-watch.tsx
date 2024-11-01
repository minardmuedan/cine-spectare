import { Button } from '@/components/ui/button'
import { CheckCheckIcon } from 'lucide-react'
import { TToggleMutationProps } from './_type'

export default function ToggleAlreadyWatched({ media, render, ...buttonProps }: TToggleMutationProps) {
  const props = {
    ...buttonProps,
    disabled: false,
    onClick: () => console.log('already watched', media.title),
    children: (
      <>
        <CheckCheckIcon />
        <p>Already Watched</p>
      </>
    ),
  }

  if (render) return render(props)
  return <Button {...props} />
}
