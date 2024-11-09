'use client'

import { TViewHistoryMedia } from '@/lib/schema'
import { addViewHistoryAction } from './action'

type TProps = {
  children: React.ReactNode
  className?: string
  media: TViewHistoryMedia
}

export default function ViewHistoryWrapper({ children, className, media }: TProps) {
  return (
    <div onClick={() => addViewHistoryAction(media)} className={className}>
      {children}
    </div>
  )
}
