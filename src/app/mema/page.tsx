'use client'

import { useQuery } from '@tanstack/react-query'

export default function MemaPage() {
  const { data: ewan } = useQuery({ queryKey: ['media', 'already-watched'], queryFn: fetcher })
  return <pre>{JSON.stringify(ewan, null, 2)}</pre>
}

const fetcher = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  return await res.json()
}
