'use client'

import { useState } from 'react'
import { Button } from './ui/button'

export default function ViewMoreContent({ text, maxLength }: { text: string; maxLength: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="text-sm text-muted-foreground *:inline">
      <p>{text.slice(0, isExpanded ? undefined : maxLength)} </p>

      {text.length > maxLength && (
        <>
          <span>... </span>
          <Button
            variant="link"
            className="size-fit p-0 opacity-75 hover:no-underline hover:opacity-100"
            onClick={() => setIsExpanded(prev => !prev)}
          >
            {isExpanded ? 'See Less' : 'See More'}
          </Button>
        </>
      )}
    </div>
  )
}
