'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

export default function PaginatedSuspenseWrapper({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  return (
    <Suspense fallback={fallback}>
      <PaginatedSuspense fallback={fallback}>{children}</PaginatedSuspense>
    </Suspense>
  )
}

function PaginatedSuspense({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') || 1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  return (
    <Suspense key={page} fallback={fallback}>
      {children}
    </Suspense>
  )
}
