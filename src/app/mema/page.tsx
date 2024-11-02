'use client'

import { useWatchLater } from '@/hooks/media/watch-later'

export default function MemaPage() {
  const { data: watchLater, isPending } = useWatchLater()
  return (
    <>
      <p>isPenidng {JSON.stringify(isPending)}</p>
      <pre>{JSON.stringify(watchLater, null, 2)}</pre>
    </>
  )
}
